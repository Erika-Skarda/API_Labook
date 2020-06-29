export class Post {
  constructor(
    private createdBy: string,
    private createdAt: Date,
    private description: string,
    private photo: string,
    private type: PostType
  ) {}

  static mapStringToPostType(value: string): PostType {
    switch (value) {
      case "normal":
        return PostType.NORMAL;
      case "evento":
        return PostType.EVENTO;
      default:
        return PostType.NORMAL;
    }
  }
}

export enum PostType {
  NORMAL = "normal",
  EVENTO = "evento",
}

export interface PostOrderInputDTO {
   by: string;
   type: string;
 }
