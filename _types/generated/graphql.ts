import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  whisky?: Maybe<Whisky>;
  whiskys: Array<Maybe<Whisky>>;
  distiller?: Maybe<Distiller>;
  distillers: Array<Maybe<Distiller>>;
};


export type QueryWhiskyArgs = {
  id: Scalars['ID'];
};


export type QueryDistillerArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createWhisky?: Maybe<Whisky>;
  createDistiller?: Maybe<Distiller>;
};


export type MutationCreateWhiskyArgs = {
  distillerId: Scalars['String'];
  name: Scalars['String'];
  blended: Scalars['Boolean'];
  age?: Maybe<Scalars['Int']>;
};


export type MutationCreateDistillerArgs = {
  name: Scalars['String'];
};

export type Whisky = {
  __typename?: 'Whisky';
  id: Scalars['ID'];
  name: Scalars['String'];
  age?: Maybe<Scalars['Int']>;
  blended: Scalars['Boolean'];
  distiller?: Maybe<Distiller>;
};

export type Distiller = {
  __typename?: 'Distiller';
  id: Scalars['ID'];
  name: Scalars['String'];
  whiskys?: Maybe<Array<Maybe<Whisky>>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Whisky: ResolverTypeWrapper<./_types/Whisky.ts>;
  Distiller: ResolverTypeWrapper<./_types/Distiller.ts>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  ID: Scalars['ID'];
  Mutation: {};
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  Whisky: ./_types/Whisky.ts;
  Distiller: ./_types/Distiller.ts;
};

export type QueryResolvers<ContextType = ./_types/Context.ts, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  whisky?: Resolver<Maybe<ResolversTypes['Whisky']>, ParentType, ContextType, RequireFields<QueryWhiskyArgs, 'id'>>;
  whiskys?: Resolver<Array<Maybe<ResolversTypes['Whisky']>>, ParentType, ContextType>;
  distiller?: Resolver<Maybe<ResolversTypes['Distiller']>, ParentType, ContextType, RequireFields<QueryDistillerArgs, 'id'>>;
  distillers?: Resolver<Array<Maybe<ResolversTypes['Distiller']>>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ./_types/Context.ts, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createWhisky?: Resolver<Maybe<ResolversTypes['Whisky']>, ParentType, ContextType, RequireFields<MutationCreateWhiskyArgs, 'distillerId' | 'name' | 'blended'>>;
  createDistiller?: Resolver<Maybe<ResolversTypes['Distiller']>, ParentType, ContextType, RequireFields<MutationCreateDistillerArgs, 'name'>>;
};

export type WhiskyResolvers<ContextType = ./_types/Context.ts, ParentType extends ResolversParentTypes['Whisky'] = ResolversParentTypes['Whisky']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  blended?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  distiller?: Resolver<Maybe<ResolversTypes['Distiller']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistillerResolvers<ContextType = ./_types/Context.ts, ParentType extends ResolversParentTypes['Distiller'] = ResolversParentTypes['Distiller']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  whiskys?: Resolver<Maybe<Array<Maybe<ResolversTypes['Whisky']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ./_types/Context.ts> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Whisky?: WhiskyResolvers<ContextType>;
  Distiller?: DistillerResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ./_types/Context.ts> = Resolvers<ContextType>;
