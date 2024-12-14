import { Resolvers, Role } from "./types";
import { compare, hash } from "bcrypt";
import passport from "passport";
import { User } from "./modules/db";
import { generateToken, generateRefreshToken } from "./lib/authUtils";
import {
  CreateCommentSchema,
  CreateMediaSchema,
  CreatePostSchema,
  CreateTagSchema,
  SanitizedCreateCommentInput,
  SanitizedCreateMediaInput,
  SanitizedCreatePostInput,
  SanitizedCreateTagInput,
} from "./schemas";

export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { user, db }) => {
      if (!user) {
        throw new Error("Not authenticated");
      }

      const dbUser = await db.user.findUnique({
        where: { id: user.id },
        include: {
          accounts: true,
        },
      });

      if (!dbUser) {
        throw new Error("User not found");
      }

      return {
        ...dbUser,
        role: dbUser.role as Role,
        emailVerified: dbUser.emailVerified
          ? dbUser.emailVerified.toISOString()
          : null,
        createdAt: dbUser.createdAt.toISOString(),
        updatedAt: dbUser.updatedAt.toISOString(),
        accounts: dbUser.accounts.map((account) => ({
          ...account,
          createdAt: account.createdAt.toISOString(),
          updatedAt: account.updatedAt.toISOString(),
        })),
      };
    },
  },
  Mutation: {
    register: async (_, { data: { name, email, password } }, { db }) => {
      const existingUser = await db.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error("Email already in use");
      }

      const hashedPassword = await hash(password, 10);

      const newUser = await db.user.create({
        data: {
          name,
          email,
          role: "USER",
          accounts: {
            create: {
              type: "credentials",
              provider: "local",
              providerAccountId: email,
              access_token: hashedPassword,
            },
          },
        },
        include: {
          accounts: true,
        },
      });

      const token = generateToken(newUser);
      const refreshToken = generateRefreshToken(newUser);

      return {
        token,
        refreshToken,
        user: {
          ...newUser,
          role: newUser.role as Role,
          emailVerified: newUser.emailVerified
            ? newUser.emailVerified.toISOString() // Convert Date to String
            : null,
          createdAt: newUser.createdAt.toISOString(),
          updatedAt: newUser.updatedAt.toISOString(),
          accounts: newUser.accounts.map((account) => ({
            ...account,
            createdAt: account.createdAt.toISOString(),
            updatedAt: account.updatedAt.toISOString(),
          })),
        },
      };
    },
    login: async (_, { data: { email, password } }, { db }) => {
      const user = await db.user.findUnique({
        where: { email },
        include: { accounts: true },
      });

      if (!user || !user.accounts.length) {
        throw new Error("Invalid email or password");
      }

      const credentialsAccount = user.accounts.find(
        (account) =>
          account.type === "credentials" && account.provider === "local",
      );

      if (!credentialsAccount) {
        throw new Error("Invalid email or password");
      }

      const validPassword = await compare(
        password,
        credentialsAccount.access_token || "",
      );

      if (!validPassword) {
        throw new Error("Invalid email or password");
      }

      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user);

      return {
        token,
        refreshToken,
        user: {
          ...user,
          role: user.role as Role,
          emailVerified: user.emailVerified
            ? user.emailVerified.toISOString()
            : null,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
          accounts: user.accounts.map((account) => ({
            ...account,
            createdAt: account.createdAt.toISOString(),
            updatedAt: account.updatedAt.toISOString(),
          })),
        },
      };
    },
    loginWithGoogle: async (_, { accessToken }, { db }) => {
      // Authenticate using passport with the "google-token" strategy
      const user = await new Promise<User>((resolve, reject) => {
        passport.authenticate(
          "google-token",
          { session: false },
          async (err: any, user: User) => {
            if (err || !user) {
              return reject(err || new Error("Google login failed"));
            }

            // check if user exists in the database
            let existingUser = await db.user.findUnique({
              where: { email: user.email },
            });

            if (!existingUser) {
              // if user doesn't exist, create a new one
              existingUser = await db.user.create({
                data: {
                  name: user.name,
                  email: user.email,
                  image: user.image,
                  role: "USER",
                },
              });
            }

            resolve(existingUser);
          },
        )({ headers: { authorization: `Bearer ${accessToken}` } });
      });

      // generate access and refresh tokens
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      const refreshToken = generateRefreshToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      // return the AuthPayload
      return {
        token,
        refreshToken,
        user: {
          ...user,
          role: user.role as Role,
          emailVerified: user.emailVerified
            ? user.emailVerified.toISOString()
            : null,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        },
      };
    },

    createPost: async (
      _,
      { data }: { data: SanitizedCreatePostInput },
      { dataSources },
    ) => {
      // Sanitize and validate the input data using Zod
      const sanitizedData = CreatePostSchema.parse(data);
      try {
        // Use the data source to create the post
        const post = await dataSources.postAPI.createPost(sanitizedData);

        return {
          ...post,
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString(),
        };
      } catch (error) {
        throw new Error("Failed to create post");
      }
    },
    createComment: async (
      _,
      { data }: { data: SanitizedCreateCommentInput },
      { dataSources },
    ) => {
      try {
        const sanitizedData = CreateCommentSchema.parse(data);
        const comment =
          await dataSources.commentAPI.createComment(sanitizedData);
        return {
          ...comment,
          createdAt: comment.createdAt.toISOString(),
        };
      } catch (error) {
        throw new Error("Failed to create post");
      }
    },
    createTag: async (
      _,
      { data }: { data: SanitizedCreateTagInput },
      { dataSources },
    ) => {
      try {
        const sanitizedData = CreateTagSchema.parse(data);
        const tag = await dataSources.tagAPI.createTag(sanitizedData);
        return tag;
      } catch (error) {
        throw new Error("Failed to create tag");
      }
    },
    createMedia: async (
      _,
      { data }: { data: SanitizedCreateMediaInput },
      { dataSources },
    ) => {
      try {
        const sanitizedData = CreateMediaSchema.parse(data);
        const media = await dataSources.mediaAPI.createMedia(sanitizedData);
        return media;
      } catch (error) {
        throw new Error("Failed to create media");
      }
    },
  },
};
