import express from "express";
import authorize from "../middleware/authorization.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send/:roomId", authorize, sendMessage);
router.get("/:roomId", authorize, getMessages);

export default router;
