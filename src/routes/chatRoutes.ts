import { getAllRootCourseByGrade } from "$controllers/chatController";
import express from "express";

const chatRoutes = express.Router();

chatRoutes.get(
  "/chat/:gradeId",
  getAllRootCourseByGrade
);

export default chatRoutes;
