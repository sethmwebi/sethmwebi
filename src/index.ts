import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import path from "path";
import { resolvers } from "./resolvers";
import { gql } from "graphql-tag";
import { AccountAPI } from "./datasources/account";
import { PrismaClient } from "@prisma/client";
import { CategoryAPI } from "./datasources/category";
import { CommentAPI } from "./datasources/comment";
import { LikeAPI } from "./datasources/like";
import { MediaAPI } from "./datasources/media";
import { PostAPI } from "./datasources/post";
import { PostCategoryAPI } from "./datasources/postCategory";
import { PostTagAPI } from "./datasources/postTag";
import { TagAPI } from "./datasources/tag";
import { UserAPI } from "./datasources/user";
import { VerificationTokenAPI } from "./datasources/verification";

const typeDefs = gql(
  readFileSync(path.resolve(__dirname, "./schema.graphql"), {
    encoding: "utf-8",
  }),
);

const prisma = new PrismaClient();

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      return {
        dataSources: () => ({
          accountAPI: new AccountAPI({ prisma }),
          categoryAPI: new CategoryAPI({ prisma }),
          commentAPI: new CommentAPI({ prisma }),
          likeAPI: new LikeAPI({ prisma }),
          mediaAPI: new MediaAPI({ prisma }),
          postAPI: new PostAPI({ prisma }),
          postCategoryAPI: new PostCategoryAPI({ prisma }),
          postTagAPI: new PostTagAPI({ prisma }),
          tagAPI: new TagAPI({ prisma }),
          userAPI: new UserAPI({ prisma }),
          verificationAPI: new VerificationTokenAPI({ prisma }),
        }),
      };
    },
  });
  console.log(`Server is running at ${url}`);
}

startApolloServer();
