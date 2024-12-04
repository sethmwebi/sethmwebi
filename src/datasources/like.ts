import { PrismaClient, Like } from "@prisma/client";

export class LikeAPI {
  prisma: PrismaClient;
  context: any;

  constructor({ prisma }: { prisma: PrismaClient }) {
    this.prisma = prisma;
  }

  initialize(config: { context: any }) {
    this.context = config.context;
  }

  async createLike(postId: string, userId: string): Promise<Like> {
    try {
      return await this.prisma.like.create({
        data: { postId, userId },
      });
    } catch (error) {
      console.error("Error creating like: ", error);
      throw error;
    }
  }

  async getLikeById(likeId: string): Promise<Like | null> {
    try {
      return await this.prisma.like.findUnique({
        where: { id: likeId },
      });
    } catch (error) {
      console.error("Error fetching like by ID:", error);
      return null;
    }
  }

  async deleteLike(likeId: string): Promise<boolean> {
    try {
      await this.prisma.like.delete({
        where: { id: likeId },
      });
      return true;
    } catch (error) {
      console.log("Error deleting like: ", error);
      return false;
    }
  }
}
