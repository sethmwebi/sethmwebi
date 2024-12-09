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

export interface DataSourceContext {
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
