import { AccountAPI } from "./account";
import { PrismaClient } from "@prisma/client";
import { CategoryAPI } from "./category";
import { CommentAPI } from "./comment";
import { LikeAPI } from "./like";
import { MediaAPI } from "./media";
import { PostAPI } from "./post";
import { PostCategoryAPI } from "./postCategory";
import { PostTagAPI } from "./postTag";
import { TagAPI } from "./tag";
import { UserAPI } from "./user";
import { VerificationTokenAPI } from "./verification";

export {
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
};
