import bcrypt from "bcryptjs";
import Room from "../models/room.model.js";

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
        participants: newRoom.participants,
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
    if (room.password !== password) {
      return res.status(400).json({ error: "Password is incorrect" });
    }
    if (room.participants.includes(loggedInUserId)) {
      return res.status(400).json({ error: "You are already in this room" });
    }
    room.participants.push(loggedInUserId);
    await room.save();
    return res.status(200).json({
      _id: room._id,
      name: room.name,
      owner: room.owner,
      participants: room.participants,
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
    // delete the room if the owner leaves
    if (room.owner.toString() === loggedInUserId) {
      await Room.findByIdAndDelete(roomId);
      // SOCKET FUNCTIONALITY

      // This is backend part
      // socket.emit("deleteRoom", roomId);

      // This is frontend part
      // socket.on('deleteRoom', (roomId) => {
      //   // making room context as empty context
      // })
      return res.status(200).json({
        _id: "",
        name: "",
        owner: "",
        participants: [],
      });
    }
    room.participants = room.participants.filter(
      (participant) => participant.toString() !== loggedInUserId
    );
    await room.save();
    return res.status(200).json({
      _id: room._id,
      name: room.name,
      owner: room.owner,
      participants: room.participants,
    });
  } catch (error) {
    console.log("Error in leaveRoom controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
