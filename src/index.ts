import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
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
import db from "./modules/db";

const app = express();

const httpServer = http.createServer(app);

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
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const { cache } = server;
        return {
          db,
          cache,
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
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
}

startApolloServer();
