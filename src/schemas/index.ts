import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  content: z.string().min(1, { message: "content is required" }),
  imageUrl: z.string().url().optional(),
  authorId: z.string().min(1, { message: "author id is required" }),
});

export const CreateCommentSchema = z.object({
  content: z.string().min(1, { message: "comment required" }),
  postId: z.string().min(1, { message: "post id required" }),
  userId: z.string().min(1, { message: "user id required" }),
});

export const CreateCategorySchema = z.object({
  name: z.string().min(1, { message: "name of the category required" }),
  slug: z
    .string()
    .min(1, { message: "slug for the category required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "please enter a correct slug",
    }),
});

export const CreateTagSchema = z.object({
  name: z.string().min(1, { message: "name of tag is required" }),
  slug: z
    .string()
    .min(1, { message: "slug for tag required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "please enter valid slug ",
    }),
});

export const CreateMediaSchema = z.object({
  url: z.string().url().min(1, { message: "Url to media is required" }),
  type: z.string().min(1, { message: "type of media is required" }),
  postId: z.string().optional(),
  userId: z.string().optional(),
});
