// It contains my cloudinary credentials.
// So need to put it in .gitignore to ignore this file in github

import Room from "../models/room.model.js";
import fs from "fs";
// import cloudinary from "../cloudinary/cloudinary.js";

import { v2 as cloudinary } from "cloudinary";

// These are my cloudinary credentials.
// Need to ignore this in github repo
cloudinary.config({
  cloud_name: "dvkt1djfc",
  api_key: "456967988534552",
  api_secret: "Dy9ynr_CiByINE4ogw0M1_1XzHU", // Click 'View Credentials' below to copy your API secret
});

export const addVideo = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(400).json({ error: "Room does not exist" });
    }
    console.log(req.file);
    // If room exists, upload the video to cloudinary
    const result = await cloudinary.uploader
      .upload(req.file.path, {
        resource_type: "video",
      })
      .catch((error) => {
        console.log(error);
        console.log("first error");
      });

    // Need to remove the uploaded video from the uploads directory after uploading video
    // to cloudinary
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`File ${req.file.path} deleted successfully`);
    });

    /* You can upload large videos to cloudinary int paid plan (not in free plan)
     ** - Size limit in free plan is 100MB
     ** - Size limit in paid plan is 2GB
     */

    // const result = await new Promise((resolve, reject) => {
    //   cloudinary.uploader.upload_large(
    //     req.file.path,
    //     {
    //       resource_type: "video",
    //     },
    //     (error, result) => {
    //       if (error) {
    //         console.log(error);
    //         reject(error);
    //       }
    //       resolve(result);
    //     }
    //   );
    // });

    room.video = {
      name: req.file.filename,
      public_id: result.public_id,
      url: result.secure_url,
    };
    await room.save();
    return res.status(200).json({
      _id: room._id,
      name: room.name,
      owner: room.owner,
      video: {
        name: req.file.filename,
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
  } catch (error) {
    console.log("Error in addVideo controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteVideo = async (publicId) => {
  await cloudinary.uploader.destroy(
    publicId,
    {
      resource_type: "video",
    },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`File ${publicId} deleted successfully`);
    }
  );
};
