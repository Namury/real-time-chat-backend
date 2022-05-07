import { login, register, editUser } from "$controllers/userController";
import { checkJwt } from "$middlewares/authMiddleware";
import express from "express";

const userRoutes = express.Router();

userRoutes.post("/login", login);
userRoutes.post("/register", register);
userRoutes.put("/edit/:userUuid", checkJwt, editUser);

export default userRoutes;
