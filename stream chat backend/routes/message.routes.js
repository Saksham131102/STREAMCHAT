import express from "express";
import authorize from "../middleware/authorization.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send/:roomId", sendMessage);
router.get("/:roomId", getMessages);

export default router;
