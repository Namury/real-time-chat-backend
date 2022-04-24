import { getAllRootCourseByGrade } from "$controllers/chatController";
import express from "express";

const chatRoutes = express.Router();

chatRoutes.get(
  "/room",
  getAllRootCourseByGrade
);

export default chatRoutes;
