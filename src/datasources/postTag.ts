import { PostTag, PrismaClient } from "@prisma/client";

export class PostTagAPI {
  prisma: PrismaClient;
  context: any;

  constructor({ prisma }: { prisma: PrismaClient }) {
    this.prisma = prisma;
  }

  initialize(config: { context: any }) {
    this.context = config.context;
  }

  async createPostTag(data: PostTag): Promise<PostTag> {
    try {
      return await this.prisma.postTag.create({
        data,
      });
    } catch (error) {
      console.log("Error creating post tag: ", error);
      throw error;
    }
  }

  async getPostTagsByTagId(tagId: string): Promise<PostTag[]> {
    try {
      return await this.prisma.postTag.findMany({
        where: { tagId },
      });
    } catch (error) {
      return [];
    }
  }

  async getPostTags(postId: string): Promise<PostTag[]> {
    try {
      return await this.prisma.postTag.findMany({
        where: { postId },
      });
    } catch (error) {
      console.error("Error fetching post tags: ", error);
      return [];
    }
  }
}
