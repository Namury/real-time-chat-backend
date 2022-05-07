import {
  getRoomClient,
  getRoomNameByUserId,
  getRoomNameByRoomUuid,
  createRoom,
  editRoom,
  deleteRoom,
} from "$controllers/chatController";
import { checkJwt } from "$middlewares/authMiddleware";
import express from "express";

const chatRoutes = express.Router();

chatRoutes.get("/room/all", getRoomClient);
chatRoutes.get("/room/user", checkJwt, getRoomNameByUserId);
chatRoutes.get("/room/:roomUuid", checkJwt, getRoomNameByRoomUuid);
chatRoutes.post("/room/create", checkJwt, createRoom);
chatRoutes.put("/room/edit/:roomUuid", checkJwt, editRoom);
chatRoutes.delete("/room/delete/:roomUuid", checkJwt, deleteRoom);

export default chatRoutes;
