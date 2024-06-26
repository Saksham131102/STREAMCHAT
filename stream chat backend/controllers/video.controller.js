// It contains my cloudinary credentials.
// So need to put it in .gitignore to ignore this file in github

import Room from "../models/room.model.js";
// import cloudinary from "../cloudinary/cloudinary.js";

import { v2 as cloudinary } from "cloudinary";

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
    // If room exists, upload the video to cloudinary
    const result = await cloudinary.uploader
      .upload(req.file.path, {
        resource_type: "video",
      })
      .catch((error) => {
        console.log(error);
      });

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
      participants: room.participants,
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
