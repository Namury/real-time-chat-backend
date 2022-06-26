import { login, verify, register, editUser } from "$controllers/userController";
import { checkJwt } from "$middlewares/authMiddleware";
import express from "express";

const userRoutes = express.Router();

userRoutes.get("/verify", verify)
userRoutes.post("/login", login);
userRoutes.post("/register", register);
userRoutes.put("/edit/:userUuid", checkJwt, editUser);

export default userRoutes;
