import express from "express";
import authorize from "../middleware/authorization.js";
import {
  createRoom,
  joinRoom,
  leaveRoom,
} from "../controllers/room.controller.js";

const router = express.Router();

router.post("/create", authorize, createRoom);
router.post("/join", authorize, joinRoom);
router.post("/leave/:roomId", authorize, leaveRoom);

export default router;
