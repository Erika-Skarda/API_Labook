import express from "express";
import { PostController } from "../controller/PostController";

export const postRouter = express.Router();

postRouter.post("/create", new PostController().createPost);
postRouter.get("/feed", new PostController().getPosts);
postRouter.get("/orderby", new PostController().getPostByType);
postRouter.post("/dislike/:postId", new PostController().dislikePost);
postRouter.post("/:postId", new PostController().likePost);
postRouter.post("/comment/:postId", new PostController().comment)
postRouter.get("/page", new PostController().getPostsBySortAndPage)
