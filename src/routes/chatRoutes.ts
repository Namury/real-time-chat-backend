import { getRoomClient } from "$controllers/chatController";
import express from "express";

const chatRoutes = express.Router();

chatRoutes.get(
  "/room",
  getRoomClient
);

export default chatRoutes;
