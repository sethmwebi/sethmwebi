import { Resolvers, Role } from "./types";
import { compare, hash } from "bcrypt";
import passport from "passport";
import { User } from "./modules/db";
import { generateToken, generateRefreshToken } from "./lib/authUtils";
import {
  CreateCommentSchema,
  CreateLikeSchema,
  CreateMediaSchema,
  CreatePostSchema,
  CreateTagSchema,
  SanitizedCreateCommentInput,
  SanitizedCreateLikeInput,
  SanitizedCreateMediaInput,
  SanitizedCreatePostInput,
  SanitizedCreateTagInput,
  SanitizedUpdatePostInput,
  SanitizedCreatePostCategoryInput,
  CreatePostCategorySchema,
  CreatePostTagSchema,
  SanitizedCreatePostTagInput,
  SanitizedRegisterUserInput,
  RegisterSchema,
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
    account: async (_, __, { dataSources, user }) => {
      if (!user || !user.id) {
        throw new Error("User is not authenticated or user ID is missing.");
      }
      const account = await dataSources.accountAPI.getAccountByUserId(user.id!);

      if (!account) {
        throw new Error(`Account not found for user ID: ${user.id}`);
      }

      return {
        ...account,
        createdAt: account.createdAt.toISOString(),
        updatedAt: account.updatedAt.toISOString(),
      };
    },
    category: async (_, { id }: { id: string }, { dataSources }) => {
      // fetch category by id
      const category = await dataSources.categoryAPI.getCategoryById(id);

      if (!category) {
        throw new Error(`Category with ID ${id} not found.`);
      }

      return category;
    },
    categories: async (_, __, { dataSources }) => {
      // fetch all categories
      return await dataSources.categoryAPI.getCategories();
    },
    comment: async (_, { id }: { id: string }, { dataSources }) => {
      try {
        const comment = await dataSources.commentAPI.getCommentById(id);

        if (!comment) {
          throw new Error(`Comment with ID ${id} not found`);
        }

        return { ...comment, createdAt: comment.createdAt.toISOString() };
      } catch (error) {
        throw new Error("An error occured");
      }
    },
    post: async (_, { id }: { id: string }, { dataSources }) => {
      try {
        const post = await dataSources.postAPI.getPostById(id);
        if (!post) {
          throw new Error(`Post with ID ${id} not found`);
        }
        return {
          ...post,
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString(),
        };
      } catch (error) {
        throw new Error("Failed to fetch post");
      }
    },
    posts: async (_, __, { dataSources }) => {
      try {
        const posts = await dataSources.postAPI.getAllPosts();
        return posts.map((post) => ({
          ...post,
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.createdAt.toISOString(),
        }));
      } catch (error) {
        throw new Error("Failed to fetch results");
      }
    },
    getPostCategories: async (
      _,
      { postId }: { postId: string },
      { dataSources },
    ) => {
      try {
        const postCategories =
          await dataSources.postCategoryAPI.getPostCategories(postId);
        if (!postCategories.length) {
          throw new Error("No categories found for the specified post");
        }
        return postCategories;
      } catch (error) {
        throw new Error("Failed to fetch post categories");
      }
    },
    getPostTags: async (_, { postId }: { postId: string }, { dataSources }) => {
      return await dataSources.postTagAPI.getPostTags(postId);
    },
    getTagById: async (_, { tagId }: { tagId: string }, { dataSources }) => {
      try {
        const tag = await dataSources.tagAPI.getTagById(tagId);
        if (!tag) {
          throw new Error(`Tag with ID ${tagId} not found.`);
        }
        return tag;
      } catch (error) {
        throw new Error("Failed to fetch tag by ID");
      }
    },
    tags: async (_, __, { dataSources }) => {
      try {
        return await dataSources.tagAPI.getTags();
      } catch (error) {
        throw new Error("Failed to fetch tags");
      }
    },
  },
  Tag: {
    posts: async (tag, _, { dataSources }) => {
      try {
        return await dataSources.postTagAPI.getPostTagsByTagId(tag.id);
      } catch (error) {
        return [];
      }
    },
  },
  Mutation: {
    register: async (
      _,
      { data }: { data: SanitizedRegisterUserInput },
      { db },
    ) => {
      const {
        email,
        name,
        password,
        provider = "local",
        type = "credentials",
      } = RegisterSchema.parse(data);
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
              type,
              provider,
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
      try {
        // Sanitize and validate the input data using Zod
        const sanitizedData = CreatePostSchema.parse(data);
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
    updatePost: async (
      _,
      { id, data }: { id: string; data: SanitizedUpdatePostInput },
      { dataSources },
    ) => {
      try {
        const updatedPost = await dataSources.postAPI.updatePost(id, data);
        if (!updatedPost) {
          throw new Error(`Failed to update post with ID ${id}`);
        }
        // format dates
        return {
          ...updatedPost,
          createdAt: updatedPost.createdAt.toISOString(),
          updatedAt: updatedPost.updatedAt.toISOString(),
        };
      } catch (error) {
        throw new Error("Failed to update the post");
      }
    },
    deletePost: async (_, { id }: { id: string }, { dataSources }) => {
      try {
        const isDeleted = await dataSources.postAPI.deletePost(id);
        if (!isDeleted) {
          throw new Error("Deletion failed");
        }
        return true;
      } catch (error) {
        throw new Error("Failed to delete post");
      }
    },
    createPostCategory: async (
      _,
      { data }: { data: SanitizedCreatePostCategoryInput },
      { dataSources },
    ) => {
      try {
        const sanitizedData = CreatePostCategorySchema.parse(data);
        return await dataSources.postCategoryAPI.createPostCategory(
          sanitizedData.postId,
          sanitizedData.categoryId,
        );
      } catch (error) {
        throw new Error("Failed to create post category");
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
    deleteComment: async (_, { id }: { id: string }, { dataSources }) => {
      try {
        // delete the comment by id
        const success = await dataSources.commentAPI.deleteComment(id);
        if (!success) {
          throw new Error(`Failed to delete comment with ID ${id}`);
        }
        return success;
      } catch (error) {
        throw new Error("Failed to delete comment");
      }
    },
    createLike: async (
      _,
      { data }: { data: SanitizedCreateLikeInput },
      { dataSources },
    ) => {
      try {
        const sanitizedData = CreateLikeSchema.parse(data);
        const like = await dataSources.likeAPI.createLike(sanitizedData);
        return {
          ...like,
          createdAt: like.createdAt.toISOString(),
        };
      } catch (error) {
        throw new Error("Failed to create like");
      }
    },
    deleteLike: async (_, { id }: { id: string }, { dataSources }) => {
      try {
        const success = await dataSources.likeAPI.deleteLike(id);
        if (!success) {
          throw new Error(`Failed to delete like with ID ${id}`);
        }

        return success;
      } catch (error) {
        throw new Error("Failed to delete like");
      }
    },
    createPostTag: async (
      _,
      { data }: { data: SanitizedCreatePostTagInput },
      { dataSources },
    ) => {
      try {
        const sanitizedData = CreatePostTagSchema.parse(data);
        const postTag =
          await dataSources.postTagAPI.createPostTag(sanitizedData);
        return postTag;
      } catch (error) {
        throw new Error("Failed to create post tag");
      }
    },
    createTag: async (
      _,
      { data }: { data: SanitizedCreateTagInput },
      { dataSources },
    ) => {
      try {
        const sanitizedData = CreateTagSchema.parse(data);
        // check if tag with the same slug already exists
        const existingTag = await dataSources.tagAPI.getTagBySlug(
          sanitizedData.slug,
        );
        if (existingTag) {
          throw new Error(
            `A tag with slug "${sanitizedData.slug}" already exists.`,
          );
        }
        return await dataSources.tagAPI.createTag(data);
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
