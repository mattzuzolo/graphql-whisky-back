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
  producer?: Maybe<Producer>;
  region?: Maybe<Region>;
  country?: Maybe<Country>;
  countryByAlias?: Maybe<Country>;
  regionByAlias?: Maybe<Region>;
  whiskys: Array<Maybe<Whisky>>;
  producers: Array<Maybe<Producer>>;
  countries: Array<Maybe<Country>>;
  regions: Array<Maybe<Region>>;
};


export type QueryWhiskyArgs = {
  id: Scalars['ID'];
};


export type QueryProducerArgs = {
  id: Scalars['ID'];
};


export type QueryRegionArgs = {
  id: Scalars['ID'];
};


export type QueryCountryArgs = {
  id: Scalars['ID'];
};


export type QueryCountryByAliasArgs = {
  alias: Scalars['String'];
};


export type QueryRegionByAliasArgs = {
  alias: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProducer?: Maybe<Producer>;
  createWhisky?: Maybe<Whisky>;
  createCountry?: Maybe<Country>;
  createRegion?: Maybe<Region>;
};


export type MutationCreateProducerArgs = {
  countryId: Scalars['String'];
  name: Scalars['String'];
  regionId?: Maybe<Scalars['String']>;
};


export type MutationCreateWhiskyArgs = {
  producerId: Scalars['String'];
  name: Scalars['String'];
  blended: Scalars['Boolean'];
  age?: Maybe<Scalars['Int']>;
};


export type MutationCreateCountryArgs = {
  alias: Scalars['String'];
  name: Scalars['String'];
  shortName?: Maybe<Scalars['String']>;
};


export type MutationCreateRegionArgs = {
  countryId: Scalars['String'];
  alias: Scalars['String'];
  name: Scalars['String'];
  shortName?: Maybe<Scalars['String']>;
};

export type Whisky = {
  __typename?: 'Whisky';
  id: Scalars['ID'];
  name: Scalars['String'];
  blended: Scalars['Boolean'];
  age?: Maybe<Scalars['Int']>;
  producer: Producer;
};

export type Producer = {
  __typename?: 'Producer';
  id: Scalars['ID'];
  name: Scalars['String'];
  region?: Maybe<Region>;
  country: Country;
  whiskys?: Maybe<Array<Maybe<Whisky>>>;
};

export type Region = {
  __typename?: 'Region';
  id: Scalars['ID'];
  name: Scalars['String'];
  shortName: Scalars['String'];
  alias: Scalars['String'];
  country: Country;
  producers: Array<Maybe<Producer>>;
};

export type Country = {
  __typename?: 'Country';
  id: Scalars['ID'];
  name: Scalars['String'];
  shortName: Scalars['String'];
  alias: Scalars['String'];
  producers: Array<Maybe<Producer>>;
  regions: Array<Maybe<Region>>;
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
  String: ResolverTypeWrapper<Scalars['String']>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Whisky: ResolverTypeWrapper<./_types/Whisky.ts>;
  Producer: ResolverTypeWrapper<./_types/Producer.ts>;
  Region: ResolverTypeWrapper<./_types/Region.ts>;
  Country: ResolverTypeWrapper<./_types/Country.ts>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  ID: Scalars['ID'];
  String: Scalars['String'];
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  Whisky: ./_types/Whisky.ts;
  Producer: ./_types/Producer.ts;
  Region: ./_types/Region.ts;
  Country: ./_types/Country.ts;
};

export type QueryResolvers<ContextType = ./_types/Context.ts, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  whisky?: Resolver<Maybe<ResolversTypes['Whisky']>, ParentType, ContextType, RequireFields<QueryWhiskyArgs, 'id'>>;
  producer?: Resolver<Maybe<ResolversTypes['Producer']>, ParentType, ContextType, RequireFields<QueryProducerArgs, 'id'>>;
  region?: Resolver<Maybe<ResolversTypes['Region']>, ParentType, ContextType, RequireFields<QueryRegionArgs, 'id'>>;
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<QueryCountryArgs, 'id'>>;
  countryByAlias?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<QueryCountryByAliasArgs, 'alias'>>;
  regionByAlias?: Resolver<Maybe<ResolversTypes['Region']>, ParentType, ContextType, RequireFields<QueryRegionByAliasArgs, 'alias'>>;
  whiskys?: Resolver<Array<Maybe<ResolversTypes['Whisky']>>, ParentType, ContextType>;
  producers?: Resolver<Array<Maybe<ResolversTypes['Producer']>>, ParentType, ContextType>;
  countries?: Resolver<Array<Maybe<ResolversTypes['Country']>>, ParentType, ContextType>;
  regions?: Resolver<Array<Maybe<ResolversTypes['Region']>>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ./_types/Context.ts, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createProducer?: Resolver<Maybe<ResolversTypes['Producer']>, ParentType, ContextType, RequireFields<MutationCreateProducerArgs, 'countryId' | 'name'>>;
  createWhisky?: Resolver<Maybe<ResolversTypes['Whisky']>, ParentType, ContextType, RequireFields<MutationCreateWhiskyArgs, 'producerId' | 'name' | 'blended'>>;
  createCountry?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<MutationCreateCountryArgs, 'alias' | 'name'>>;
  createRegion?: Resolver<Maybe<ResolversTypes['Region']>, ParentType, ContextType, RequireFields<MutationCreateRegionArgs, 'countryId' | 'alias' | 'name'>>;
};

export type WhiskyResolvers<ContextType = ./_types/Context.ts, ParentType extends ResolversParentTypes['Whisky'] = ResolversParentTypes['Whisky']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blended?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  producer?: Resolver<ResolversTypes['Producer'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProducerResolvers<ContextType = ./_types/Context.ts, ParentType extends ResolversParentTypes['Producer'] = ResolversParentTypes['Producer']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['Region']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['Country'], ParentType, ContextType>;
  whiskys?: Resolver<Maybe<Array<Maybe<ResolversTypes['Whisky']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegionResolvers<ContextType = ./_types/Context.ts, ParentType extends ResolversParentTypes['Region'] = ResolversParentTypes['Region']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shortName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  alias?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['Country'], ParentType, ContextType>;
  producers?: Resolver<Array<Maybe<ResolversTypes['Producer']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryResolvers<ContextType = ./_types/Context.ts, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shortName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  alias?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  producers?: Resolver<Array<Maybe<ResolversTypes['Producer']>>, ParentType, ContextType>;
  regions?: Resolver<Array<Maybe<ResolversTypes['Region']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ./_types/Context.ts> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Whisky?: WhiskyResolvers<ContextType>;
  Producer?: ProducerResolvers<ContextType>;
  Region?: RegionResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ./_types/Context.ts> = Resolvers<ContextType>;
