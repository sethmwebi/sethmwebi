import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import path from "path";
import { resolvers } from "./resolvers";
import { gql } from "graphql-tag";

import {
  UserAPI,
  AccountAPI,
  VerificationTokenAPI,
  PostAPI,
  CommentAPI,
  LikeAPI,
  CategoryAPI,
  TagAPI,
  PostCategoryAPI,
  PostTagAPI,
  MediaAPI,
} from "./datasources";
import { PrismaClient } from "@prisma/client";
import { DataSourceContext } from "./context";

const typeDefs = gql(
  readFileSync(path.resolve(__dirname, "./schema.graphql"), {
    encoding: "utf-8",
  }),
);

const prisma = new PrismaClient();

async function startApolloServer() {
  const server = new ApolloServer<DataSourceContext>({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const { cache } = server;
      return {
        dataSources: {
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
        },
      };
    },
  });
  console.log(`Server is running at ${url}`);
}

startApolloServer();
