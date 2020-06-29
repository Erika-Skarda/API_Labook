import express from "express"
import { UserController } from "../controller/UserController"

export const userRouter = express.Router();

userRouter.post("/signup", new UserController().signUp);
userRouter.post("/login", new UserController().login)
userRouter.post("/friend", new UserController().addFriend)
userRouter.post("/unfriend", new UserController().deleteFriend)