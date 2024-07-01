import Message from "../models/message.model.js";
import Room from "../models/room.model.js";
import User from "../models/user.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { message } = req.body;
    const loggedInUserId = req.user._id;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(400).json({ error: "Room does not exist" });
    }
    const newMessage = new Message({
      message,
      sender: loggedInUserId,
      room: roomId,
    });
    await newMessage.save();
    room.messages.push(newMessage._id);
    await room.save();
    const populatedMessage = await Message.findById(newMessage._id).populate(
      "sender"
    );
    return res.status(200).json({
      _id: populatedMessage._id,
      message: populatedMessage.message,
      sender: populatedMessage.sender.username,
      profilePic: populatedMessage.sender.profilePic,
      room: populatedMessage.room,
      time: populatedMessage.createdAt,
    });
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId).populate("messages");
    if (!room) {
      return res.status(400).json({ error: "Room does not exist" });
    }
    const messages = room.messages;
    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
