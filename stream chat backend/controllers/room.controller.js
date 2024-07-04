import bcrypt from "bcryptjs";
import Room from "../models/room.model.js";
import Message from "../models/message.model.js";
// import { io } from "../socket/socket.js";
import { deleteVideo } from "./video.controller.js";

export const createRoom = async (req, res) => {
  try {
    const { name, password } = req.body;
    const loggedInUserId = req.user._id;

    // Check if room name already exists
    // because all room names will be unique
    const room = await Room.findOne({ name });
    if (room) {
      return res.status(400).json({ error: "Room name already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new Room
    const newRoom = new Room({
      name,
      password: hashedPassword,
      owner: loggedInUserId,
      participants: [loggedInUserId],
    });

    // Save room to database
    if (newRoom) {
      await newRoom.save();
      return res.status(201).json({
        _id: newRoom._id,
        name: newRoom.name,
        owner: newRoom.owner,
        // participants: newRoom.participants,
        video: newRoom.video,
      });
    } else {
      return res
        .status(400)
        .json({ error: "Failed to create room. Please try again" });
    }
  } catch (error) {
    console.log("Error in createRoom controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const { name, password } = req.body;
    const loggedInUserId = req.user._id;
    const room = await Room.findOne({ name });
    if (!room) {
      return res.status(400).json({ error: "Room does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      room?.password || ""
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    if (room.participants.includes(loggedInUserId)) {
      return res.status(400).json({ error: "You are already in this room" });
    }
    room.participants.push(loggedInUserId);
    await room.save();
    // Here we will send an emit event listener with loggedInUserId so that the frontend (other users in the room) can add the user to the room context
    return res.status(200).json({
      _id: room._id,
      name: room.name,
      owner: room.owner,
      // participants: room.participants,
      video: room.video,
    });
  } catch (error) {
    console.log("Error in joinRoom controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const leaveRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const loggedInUserId = req.user._id;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(400).json({ error: "Room does not exist" });
    }
    if (!room.participants.includes(loggedInUserId)) {
      return res.status(400).json({ error: "You are not in this room" });
    }
    // Here we will send an emit event listener with loggedInUserId so that the frontend (other users in the room) can remove the user from the room context
    room.participants = room.participants.filter(
      (participant) => participant.toString() !== loggedInUserId.toString()
    );
    await room.save();
    return res.status(200).json({
      _id: room._id,
      name: room.name,
      owner: room.owner,
      // participants: room.participants,
      video: room.video,
    });
  } catch (error) {
    console.log("Error in leaveRoom controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(400).json({ error: "Room does not exist" });
    }

    // First, delete all the messages in the room
    await Message.deleteMany({ room: roomId });

    // Then, delete the room
    const deletedRoom = await Room.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return res.status(500).json({ error: "Internal server error" });
    }

    // Need to delete uploaded video from cloudinary as well
    deleteVideo(deletedRoom.video.public_id);

    return res.status(200).json({
      _id: "",
      name: "",
      owner: "",
      // participants: [],
      video: { public_id: "", url: "" },
    });
  } catch (error) {
    console.log("Error in deleteRoom controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
