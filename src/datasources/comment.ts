import { PrismaClient, Comment } from "@prisma/client";

export class CommentAPI {
  prisma: PrismaClient;
  context: any;

  constructor({ prisma }: { prisma: PrismaClient }) {
    this.prisma = prisma;
  }

  initialize(config: { context: any }) {
    this.context = config.context;
  }

  async createComment(data: Comment): Promise<Comment> {
    try {
      return await this.prisma.comment.create({ data });
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  }

  async getCommentById(commentId: string): Promise<Comment | null> {
    try {
      return await this.prisma.comment.findUnique({
        where: { id: commentId },
      });
    } catch (error) {
      console.log("Error fetching comment by ID: ", error);
      return null;
    }
  }

  async deleteComment(commentId: string): Promise<boolean> {
    try {
      await this.prisma.comment.delete({
        where: { id: commentId },
      });
      return true;
    } catch (error) {
      console.error("Error deleting comment: ", error);
      return false;
    }
  }
}
