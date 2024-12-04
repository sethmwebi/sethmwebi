import { PrismaClient, Media } from "@prisma/client";

export class MediaAPI {
  prisma: PrismaClient;
  context: any;

  constructor({ prisma }: { prisma: PrismaClient }) {
    this.prisma = prisma;
  }

  initialize(config: { context: any }) {
    this.context = config.context;
  }

  async createMedia(data: Media): Promise<Media> {
    try {
      return await this.prisma.media.create({
        data,
      });
    } catch (error) {
      console.log("Error creating media: ", error);
      throw error;
    }
  }

  async getMediaById(mediaId: string): Promise<Media | null> {
    try {
      return await this.prisma.media.findUnique({
        where: { id: mediaId },
      });
    } catch (error) {
      console.error("Error fetching media by ID: ", error);
      return null;
    }
  }
}
