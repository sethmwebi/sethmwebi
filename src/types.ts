import { GraphQLResolveInfo } from 'graphql';
import { DataSourceContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Account = {
  __typename?: 'Account';
  access_token?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  expires_at?: Maybe<Scalars['Int']['output']>;
  id_token?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  providerAccountId: Scalars['String']['output'];
  refresh_token?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  session_state?: Maybe<Scalars['String']['output']>;
  token_type?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: User;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  posts?: Maybe<Array<Maybe<Post>>>;
  slug?: Maybe<Scalars['String']['output']>;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  post?: Maybe<Post>;
  user?: Maybe<User>;
};

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateLikeInput = {
  postId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateMediaInput = {
  postId?: InputMaybe<Scalars['ID']['input']>;
  type: Scalars['String']['input'];
  url: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreatePostCategoryInput = {
  categoryId: Scalars['String']['input'];
  postId: Scalars['String']['input'];
};

export type CreatePostInput = {
  authorId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreatePostTagInput = {
  postId: Scalars['String']['input'];
  tagId: Scalars['String']['input'];
};

export type CreateTagInput = {
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  emailVerified?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  post?: Maybe<Post>;
  user?: Maybe<User>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Media = {
  __typename?: 'Media';
  id: Scalars['ID']['output'];
  post?: Maybe<Post>;
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createComment: Comment;
  createLike: Like;
  createMedia: Media;
  createPost: Post;
  createPostCategory: PostCategory;
  createPostTag: PostTag;
  createTag: Tag;
  createUser: User;
  deleteComment: Scalars['Boolean']['output'];
  deleteLike: Scalars['Boolean']['output'];
  deletePost: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login?: Maybe<AuthPayload>;
  loginWithGoogle: AuthPayload;
  register: AuthPayload;
  updatePost?: Maybe<Post>;
  updateUserProfile?: Maybe<User>;
};


export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput;
};


export type MutationCreateCommentArgs = {
  data: CreateCommentInput;
};


export type MutationCreateLikeArgs = {
  data: CreateLikeInput;
};


export type MutationCreateMediaArgs = {
  data: CreateMediaInput;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationCreatePostCategoryArgs = {
  data: CreatePostCategoryInput;
};


export type MutationCreatePostTagArgs = {
  data: CreatePostTagInput;
};


export type MutationCreateTagArgs = {
  data: CreateTagInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLikeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationLoginWithGoogleArgs = {
  accessToken: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserProfileArgs = {
  data: UpdateUserProfileInput;
  id: Scalars['ID']['input'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  categories?: Maybe<Array<Maybe<Category>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  likes?: Maybe<Array<Maybe<Like>>>;
  media?: Maybe<Array<Maybe<Media>>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type PostCategory = {
  __typename?: 'PostCategory';
  categoryId: Scalars['String']['output'];
  postId: Scalars['String']['output'];
};

export type PostTag = {
  __typename?: 'PostTag';
  postId: Scalars['String']['output'];
  tagId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  categories: Array<Category>;
  category: Category;
  comment: Comment;
  comments: Array<Comment>;
  getCommentsByUserId: Array<Comment>;
  getLikesByUserId: Array<Like>;
  getMediaByUserId: Array<Media>;
  getPostCategories: Array<PostCategory>;
  getPostTags: Array<PostTag>;
  getPostsByUserId: Array<Post>;
  getTagById?: Maybe<Tag>;
  getUserById?: Maybe<User>;
  like: Like;
  me?: Maybe<User>;
  media: Array<Media>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  /** Tags is different from post tags */
  tags: Array<Tag>;
  users: Array<User>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCommentsByUserIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetLikesByUserIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetMediaByUserIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPostCategoriesArgs = {
  postId: Scalars['String']['input'];
};


export type QueryGetPostTagsArgs = {
  postId: Scalars['ID']['input'];
};


export type QueryGetPostsByUserIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTagByIdArgs = {
  tagId: Scalars['ID']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLikeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  Superadmin = 'SUPERADMIN',
  User = 'USER'
}

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  posts?: Maybe<Array<Maybe<PostTag>>>;
  slug: Scalars['String']['output'];
};

export type UpdatePostInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['ID']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserProfileInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
};

export type User = {
  __typename?: 'User';
  accounts?: Maybe<Array<Maybe<Account>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  likes?: Maybe<Array<Maybe<Like>>>;
  media?: Maybe<Array<Maybe<Media>>>;
  name?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Maybe<Post>>>;
  role: Role;
  updatedAt: Scalars['String']['output'];
};

export type VerificationToken = {
  __typename?: 'VerificationToken';
  expires: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  token: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  Comment: ResolverTypeWrapper<Comment>;
  CreateCategoryInput: CreateCategoryInput;
  CreateCommentInput: CreateCommentInput;
  CreateLikeInput: CreateLikeInput;
  CreateMediaInput: CreateMediaInput;
  CreatePostCategoryInput: CreatePostCategoryInput;
  CreatePostInput: CreatePostInput;
  CreatePostTagInput: CreatePostTagInput;
  CreateTagInput: CreateTagInput;
  CreateUserInput: CreateUserInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Like: ResolverTypeWrapper<Like>;
  LoginInput: LoginInput;
  Media: ResolverTypeWrapper<Media>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostCategory: ResolverTypeWrapper<PostCategory>;
  PostTag: ResolverTypeWrapper<PostTag>;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  Role: Role;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
  UpdatePostInput: UpdatePostInput;
  UpdateUserProfileInput: UpdateUserProfileInput;
  User: ResolverTypeWrapper<User>;
  VerificationToken: ResolverTypeWrapper<VerificationToken>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  Comment: Comment;
  CreateCategoryInput: CreateCategoryInput;
  CreateCommentInput: CreateCommentInput;
  CreateLikeInput: CreateLikeInput;
  CreateMediaInput: CreateMediaInput;
  CreatePostCategoryInput: CreatePostCategoryInput;
  CreatePostInput: CreatePostInput;
  CreatePostTagInput: CreatePostTagInput;
  CreateTagInput: CreateTagInput;
  CreateUserInput: CreateUserInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Like: Like;
  LoginInput: LoginInput;
  Media: Media;
  Mutation: {};
  Post: Post;
  PostCategory: PostCategory;
  PostTag: PostTag;
  Query: {};
  RegisterInput: RegisterInput;
  String: Scalars['String']['output'];
  Tag: Tag;
  UpdatePostInput: UpdatePostInput;
  UpdateUserProfileInput: UpdateUserProfileInput;
  User: User;
  VerificationToken: VerificationToken;
};

export type AccountResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  access_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expires_at?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provider?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  providerAccountId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refresh_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  session_state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthPayloadResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'data'>>;
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'data'>>;
  createLike?: Resolver<ResolversTypes['Like'], ParentType, ContextType, RequireFields<MutationCreateLikeArgs, 'data'>>;
  createMedia?: Resolver<ResolversTypes['Media'], ParentType, ContextType, RequireFields<MutationCreateMediaArgs, 'data'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'data'>>;
  createPostCategory?: Resolver<ResolversTypes['PostCategory'], ParentType, ContextType, RequireFields<MutationCreatePostCategoryArgs, 'data'>>;
  createPostTag?: Resolver<ResolversTypes['PostTag'], ParentType, ContextType, RequireFields<MutationCreatePostTagArgs, 'data'>>;
  createTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationCreateTagArgs, 'data'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
  deleteComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'id'>>;
  deleteLike?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteLikeArgs, 'id'>>;
  deletePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'data'>>;
  loginWithGoogle?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginWithGoogleArgs, 'accessToken'>>;
  register?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'data'>>;
  updatePost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'data' | 'id'>>;
  updateUserProfile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserProfileArgs, 'data' | 'id'>>;
};

export type PostResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  likes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Like']>>>, ParentType, ContextType>;
  media?: Resolver<Maybe<Array<Maybe<ResolversTypes['Media']>>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostCategoryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['PostCategory'] = ResolversParentTypes['PostCategory']> = {
  categoryId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostTagResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['PostTag'] = ResolversParentTypes['PostTag']> = {
  postId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tagId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<QueryCategoryArgs, 'id'>>;
  comment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<QueryCommentArgs, 'id'>>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  getCommentsByUserId?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryGetCommentsByUserIdArgs, 'id'>>;
  getLikesByUserId?: Resolver<Array<ResolversTypes['Like']>, ParentType, ContextType, RequireFields<QueryGetLikesByUserIdArgs, 'id'>>;
  getMediaByUserId?: Resolver<Array<ResolversTypes['Media']>, ParentType, ContextType, RequireFields<QueryGetMediaByUserIdArgs, 'id'>>;
  getPostCategories?: Resolver<Array<ResolversTypes['PostCategory']>, ParentType, ContextType, RequireFields<QueryGetPostCategoriesArgs, 'postId'>>;
  getPostTags?: Resolver<Array<ResolversTypes['PostTag']>, ParentType, ContextType, RequireFields<QueryGetPostTagsArgs, 'postId'>>;
  getPostsByUserId?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryGetPostsByUserIdArgs, 'id'>>;
  getTagById?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryGetTagByIdArgs, 'tagId'>>;
  getUserById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  like?: Resolver<ResolversTypes['Like'], ParentType, ContextType, RequireFields<QueryLikeArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  media?: Resolver<Array<ResolversTypes['Media']>, ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type TagResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['PostTag']>>>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  accounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Account']>>>, ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailVerified?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  likes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Like']>>>, ParentType, ContextType>;
  media?: Resolver<Maybe<Array<Maybe<ResolversTypes['Media']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerificationTokenResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['VerificationToken'] = ResolversParentTypes['VerificationToken']> = {
  expires?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  Account?: AccountResolvers<ContextType>;
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Like?: LikeResolvers<ContextType>;
  Media?: MediaResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostCategory?: PostCategoryResolvers<ContextType>;
  PostTag?: PostTagResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  VerificationToken?: VerificationTokenResolvers<ContextType>;
};

