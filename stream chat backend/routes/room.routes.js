import express from "express";
import authorize from "../middleware/authorization.js";
import {
  createRoom,
  joinRoom,
  leaveRoom,
  deleteRoom,
} from "../controllers/room.controller.js";

const router = express.Router();

router.post("/create", createRoom);
router.post("/join", joinRoom);
// router.delete("/leave/:id", authorize, leaveRoom);
router.post("/leave/:roomId", leaveRoom);
router.delete("/delete/:roomId", deleteRoom);

export default router;
