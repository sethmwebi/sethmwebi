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
import { DataSourceContext } from "./context";
import db from "./modules/db";
import passport from "passport";
import { authenticateJwt } from "./lib/passport";

const app = express();

const httpServer = http.createServer(app);

const typeDefs = gql(
  readFileSync(path.resolve(__dirname, "./schema.graphql"), {
    encoding: "utf-8",
  }),
);

async function startApolloServer() {
  const server = new ApolloServer<DataSourceContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(cors<cors.CorsRequest>());

  app.use(express.json());

  app.use(passport.initialize());

  app.use(
    "/",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const { cache } = server;

        const user = await authenticateJwt(req);
        return {
          db,
          cache,
          user,
          dataSources: {
            accountAPI: new AccountAPI({ prisma: db }),
            categoryAPI: new CategoryAPI({ prisma: db }),
            commentAPI: new CommentAPI({ prisma: db }),
            likeAPI: new LikeAPI({ prisma: db }),
            mediaAPI: new MediaAPI({ prisma: db }),
            postAPI: new PostAPI({ prisma: db }),
            postCategoryAPI: new PostCategoryAPI({ prisma: db }),
            postTagAPI: new PostTagAPI({ prisma: db }),
            tagAPI: new TagAPI({ prisma: db }),
            userAPI: new UserAPI({ prisma: db }),
            verificationAPI: new VerificationTokenAPI({ prisma: db }),
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
