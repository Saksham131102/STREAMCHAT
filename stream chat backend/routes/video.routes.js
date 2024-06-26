import express from "express";
import authorize from "../middleware/authorization.js";
import { addVideo } from "../controllers/video.controller.js";
import upload from "../middleware/multer/multer.js";

const router = express.Router();

router.post("/upload/:roomId", upload.single("video"), addVideo); // we will be updating video field in room document

export default router;
