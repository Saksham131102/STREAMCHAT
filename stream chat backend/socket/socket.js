import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
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
    // const sockets = io.sockets.adapter.room.get(roomId) || [];

    // Instead of making all the users leave the room,
    // we will make each user's room Context empty due
    // to which the user will disconnect and itself
    // leave the room.
    // *
    // *
    // sockets.forEach((socketId) => {
    //   const socket = io.sockets.sockets.get(socketId);
    //   if (sockets) {
    //     socket.leave(roomId);
    //   }
    // });

    socket.in(roomId).emit("roomDeleted", roomId);
  });

  socket.on("sendMessage", (message) => {
    socket.in(message.room).emit("newMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

export { app, server, io };
