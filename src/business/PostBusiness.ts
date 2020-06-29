import { PostDatabase } from "../data/PostDatabase";
import { PostOrderInputDTO } from "../model/Post";

export class PostBusiness {
  private postDatabase = new PostDatabase();

  public async createPost(
    id: string,
    photo: string,
    description: string,
    createdAt: Date,
    type: string,
    createdBy: string
  ) {
    await this.postDatabase.createPost(
      id,
      photo,
      description,
      createdAt,
      type,
      createdBy
    );
  }

  public async getPosts(id: string) {
    return await this.postDatabase.getPosts(id);
  }

  public async getPostByType(id: string, postType: string) {
    return await this.postDatabase.getPostByType(id, postType);
  }
  //Não fizemos end point pra essa
  public async getPostsByTypeAndSort(postType: string, order: PostOrderInputDTO) {
    return await this.postDatabase.getPostsByTypeAndSort(postType, order);
  }
  async getPostsBySortAndPage(order: PostOrderInputDTO, page: number) {

    const postsPerPage = 5;
    let offset =  postsPerPage * (page - 1); 
    return await new PostDatabase().getPostsBySortAndPage(order, postsPerPage, offset);
}
  
  public async searchPost(postId: string) {
    return await this.postDatabase.searchPost(postId)
  }

  public async isLiked(postId: string, userId: string) {
    return await this.postDatabase.isLiked(postId, userId)
  }

  public async likePost(postId: string, userId: string) {
    await this.postDatabase.likePost(postId, userId)
  }

  public async dislikePost(postId: string, userId: string) {
    await this.postDatabase.dislikePost(postId, userId)

  }
  public async createComment(
    postId: string,
    comment: string,
    authorId: string
    ) {
    await this.postDatabase.createComment(
      postId, 
      comment,
      authorId
      )
    }
}
