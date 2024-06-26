import Message from "../models/message.model.js";
import Room from "../models/room.model.js";

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
    return res.status(200).json(newMessage);
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
