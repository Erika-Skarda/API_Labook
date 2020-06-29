import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { PostBusiness } from "../business/PostBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { PostOrderInputDTO } from "../model/Post";

const postBusiness: PostBusiness = new PostBusiness();
const idGenerator = new IdGenerator();
const auth = new Authenticator();

export class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const idData = auth.getData(token);
      const tokenId = idData.id;

      const postData = {
        id: idGenerator.generate(),
        photo: req.body.photo,
        description: req.body.description,
        createdAt: new Date(),
        type: req.body.type,
        createdBy: tokenId,
      };

      await postBusiness.createPost(
        postData.id,
        postData.photo,
        postData.description,
        postData.createdAt,
        postData.type,
        postData.createdBy
      );

      res.status(200).send({
        message: "Post created!",
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }

  async getPosts(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const idData = auth.getData(token);
      const tokenId = idData.id;

      const posts = await postBusiness.getPosts(tokenId);

      res.status(200).send({
        posts,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }

  async getPostByType(req: Request, res: Response) {
    try {
      const token = req.headers.authorization!;
      const id = auth.getData(token).id;
      const postType = req.query.type as string;

      const posts = await postBusiness.getPostByType(id, postType);

      res.status(200).send({
        posts: posts,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }
  async getPostsBySortAndPage(request: Request, response: Response) {

    try {
        
        const order: PostOrderInputDTO =
        { 
          by: "createdAt",
          type: "ASC"   
        }
        const page: number = Number(request.body.page) >=1 ? Number(request.body.page): 1;

        if(request.body.orderBy === "createdAt" || request.body.orderBy === "type"){
            order.by = request.body.orderBy
        }

        if(request.body.orderType === "DESC"){
            order.type = request.body.orderType;
        }

        const result = await new PostBusiness().getPostsBySortAndPage(order, page);
        response.status(200).send(result);
    } catch (err) {
        response.status(400).send({ error: err.message })
    }
    await BaseDatabase.destroyConnection();
}
  
  async likePost(req: Request, res: Response) {
    try {
      const token = req.headers.authorization!;
      const id = auth.getData(token).id;
      const { postId } = req.params;

      if (!postId) {
        throw new Error("Invalid Post ID");
      }

      const searchPost = await postBusiness.searchPost(postId);

      if (!searchPost) {
        throw new Error("Post doesn't exist");
      }

      const isLiked = await postBusiness.isLiked(postId, id);

      if (isLiked) {
        throw new Error("You already liked this post");
      }

      await postBusiness.likePost(postId, id);

      res.status(200).send({
        message: "Post Liked",
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }
  async dislikePost(req: Request, res: Response) {

    try {
      const token = req.headers.authorization!;
      const id = auth.getData(token).id;

      const { postId } = req.params;

      if (!postId) {
        throw new Error("Invalid Post ID");
      }

      const searchPost = await postBusiness.searchPost(postId);

      if (!searchPost) {
        throw new Error("Post doesn't exist");
      }

      const isLiked = await postBusiness.isLiked(postId, id);

      if (!isLiked) {
        throw new Error("You didn't like this post");
      }

      await postBusiness.dislikePost(postId, id);

      res.status(200).send({
        message: "Post disliked",
      });

    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }

  async comment(req: Request, res: Response) {
    try {
      const token = req.headers.authorization!;
      const authorId = auth.getData(token).id;
      const { comment } = req.body;
      const { postId } = req.params;

      if (!postId) {
        throw new Error("Invalid Post ID");
      }

      const searchPost = await postBusiness.searchPost(postId);

      if (!searchPost) {
        throw new Error("Post doesn't exist");
      }

      await postBusiness.createComment(postId, comment, authorId);

      res.status(200).send({
        message: "Post commented",
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }
}
