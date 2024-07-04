import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    accessControlAllowOrigin: "https://streamchat1.netlify.app/",
    origin: "https://streamchat1.netlify.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  const roomId = socket.handshake.query.roomId;
  console.log("a user connected", userId);

  // Join Room
  socket.join(roomId);

  console.log(userId, "user joined room", roomId);

  // number of users in room "roomId"
  const users = io.sockets.adapter.rooms.get(roomId);
  const usersInRoom = users ? users.size : 0;
  console.log("usersInRoom", usersInRoom);

  // Emitting the event to all the users in the room "roomId" that
  // the user "userId" joined the room
  socket.in(roomId).emit("userJoinedRoom", {
    userId: socket.handshake.query.userId,
    roomId: socket.handshake.query.roomId,
  });

  // Leave Room
  socket.on("leaveRoom", (roomId, leftUserId) => {
    // First, send the leave event to the frontend
    socket.in(roomId).emit("userLeftRoom", {
      roomId,
      leftUserId,
    });

    // Then, leave the room
    socket.leave(roomId);

    console.log("user left room", roomId);

    const users = io.sockets.adapter.rooms.get(roomId);
    const usersInRoom = users ? users.size : 0;
    console.log("usersInRoom", usersInRoom);
  });

  // Delete Room
  socket.on("deleteRoom", (roomId) => {
    // on the client side, users will clear out 'room context' from local storage
    // resulting them to exit the room.
    socket.in(roomId).emit("roomDeleted", roomId);
  });

  socket.on("sendMessage", (message) => {
    socket.in(message.room).emit("newMessage", message);
  });

  socket.on("sendVideo", (data, roomId) => {
    socket.in(roomId).emit("newVideo", data);
  });

  socket.on("togglePlay", (roomId) => {
    socket.in(roomId).emit("togglePlay");
  });

  socket.on("rewind", (roomId) => {
    socket.in(roomId).emit("rewind");
  });

  socket.on("skip", (roomId) => {
    socket.in(roomId).emit("skip");
  });

  socket.on("seek", (roomId, seekData) => {
    socket.in(roomId).emit("seek", seekData);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

export { app, server, io };
