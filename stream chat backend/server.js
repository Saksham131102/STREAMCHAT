import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import videoRoutes from "./routes/video.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectToMongoDb } from "./DB/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";

app.use(
  cors({
    origin: "https://streamchat1.netlify.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
dotenv.config();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/video", videoRoutes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  connectToMongoDb();
  console.log("Server started on port 3000");
});
