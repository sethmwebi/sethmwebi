import { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { PrismaClient } from "@prisma/client";
import {
  AccountAPI,
  CategoryAPI,
  CommentAPI,
  LikeAPI,
  MediaAPI,
  PostAPI,
  PostCategoryAPI,
  PostTagAPI,
  TagAPI,
  UserAPI,
  VerificationTokenAPI,
} from "./datasources";
import { User } from "./modules/db";

export interface DataSourceContext {
  db: PrismaClient;
  user?: User | null;
  cache: KeyValueCache;
  dataSources: {
    accountAPI: AccountAPI;
    categoryAPI: CategoryAPI;
    commentAPI: CommentAPI;
    likeAPI: LikeAPI;
    mediaAPI: MediaAPI;
    postAPI: PostAPI;
    postCategoryAPI: PostCategoryAPI;
    postTagAPI: PostTagAPI;
    tagAPI: TagAPI;
    userAPI: UserAPI;
    verificationAPI: VerificationTokenAPI;
  };
}
