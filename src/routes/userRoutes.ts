import { login, register } from "$controllers/userController";
import express from "express";

const userRoutes = express.Router();

userRoutes.post("/login", login);
userRoutes.post("/register", register);

export default userRoutes;