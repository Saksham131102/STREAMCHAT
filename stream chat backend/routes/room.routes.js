import express from "express";
import authorize from "../middleware/authorization.js";
import {
  createRoom,
  joinRoom,
  leaveRoom,
  deleteRoom,
} from "../controllers/room.controller.js";

const router = express.Router();

router.post("/create", authorize, createRoom);
router.post("/join", authorize, joinRoom);
// router.delete("/leave/:id", authorize, leaveRoom);
router.post("/leave/:roomId", authorize, leaveRoom);
router.delete("/delete/:roomId", authorize, deleteRoom);

export default router;
