import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import { connectToMongoDb } from "./DB/connectToMongoDb.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
dotenv.config();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectToMongoDb();
  console.log("Server started on port 3000");
});
