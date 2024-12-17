import { z } from "zod";

// Utility functions for character checks
const containsUppercase = (ch: string): boolean => /[A-Z]/.test(ch);
const containsLowercase = (ch: string): boolean => /[a-z]/.test(ch);
const containsSpecialChar = (ch: string): boolean =>
  /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);

// Define the Register Schema
export const RegisterSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    name: z.string().optional(),
    provider: z
      .enum(["local", "google", "facebook", "twitter", "github", "apple"])
      .default("local"),
    type: z
      .enum(["credentials", "oauth", "social", "sso", "email"])
      .default("credentials"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    // Check if passwords match
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }

    // Initialize character counters
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;

    // Iterate through password to count character types
    for (const ch of password) {
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }

    // Prepare error messages as an array
    const errorMessages: string[] = [];
    if (countOfLowerCase < 1)
      errorMessages.push(
        "Password must include at least one lowercase letter.",
      );
    if (countOfUpperCase < 1)
      errorMessages.push(
        "Password must include at least one uppercase letter.",
      );
    if (countOfNumbers < 1)
      errorMessages.push("Password must include at least one number.");
    if (countOfSpecialChar < 1)
      errorMessages.push(
        "Password must include at least one special character.",
      );

    // Add custom issue with error messages array
    if (errorMessages.length > 0) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: JSON.stringify(errorMessages),
      });
    }
  });

export type SanitizedRegisterUserInput = z.infer<typeof RegisterSchema>;

export const CreatePostSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  content: z.string().min(1, { message: "content is required" }),
  imageUrl: z.string().url().optional(),
  authorId: z.string().min(1, { message: "author id is required" }),
});

export type SanitizedCreatePostInput = z.infer<typeof CreatePostSchema>;
export type SanitizedUpdatePostInput = Partial<
  z.infer<typeof CreatePostSchema>
>;

export const CreatePostCategorySchema = z.object({
  postId: z.string().min(1, { message: "Post Id is required" }),
  categoryId: z.string().min(1, { message: "Category Id is required" }),
});

export type SanitizedCreatePostCategoryInput = z.infer<
  typeof CreatePostCategorySchema
>;

export const CreatePostTagSchema = z.object({
  postId: z.string().min(1, { message: "Post Id is required" }),
  tagId: z.string().min(1, { message: "Tag Id is required" }),
});

export type SanitizedCreatePostTagInput = z.infer<typeof CreatePostTagSchema>;

export const CreateCommentSchema = z.object({
  content: z.string().min(1, { message: "comment required" }),
  postId: z.string().min(1, { message: "post id required" }),
  userId: z.string().min(1, { message: "user id required" }),
});

export type SanitizedCreateCommentInput = z.infer<typeof CreateCommentSchema>;

export const CreateCategorySchema = z.object({
  name: z.string().min(1, { message: "name of the category required" }),
  slug: z
    .string()
    .min(1, { message: "slug for the category required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "please enter a correct slug",
    }),
});

export type SanitizedCreateCategoryInput = z.infer<typeof CreateCategorySchema>;

export const CreateLikeSchema = z.object({
  postId: z.string().min(1, { message: "post id required" }),
  userId: z.string().min(1, { message: "user id required" }),
});

export type SanitizedCreateLikeInput = z.infer<typeof CreateLikeSchema>;

export const CreateTagSchema = z.object({
  name: z.string().min(1, { message: "name of tag is required" }),
  slug: z
    .string()
    .min(1, { message: "slug for tag required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "please enter valid slug ",
    }),
});

export type SanitizedCreateTagInput = z.infer<typeof CreateTagSchema>;

export const CreateMediaSchema = z.object({
  url: z.string().url().min(1, { message: "Url to media is required" }),
  type: z.string().min(1, { message: "type of media is required" }),
  postId: z.string(),
  userId: z.string(),
});

export type SanitizedCreateMediaInput = z.infer<typeof CreateMediaSchema>;
