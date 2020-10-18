import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    # Find one
    # By id
    whisky(id: ID!): Whisky
    distiller(id: ID!): Distiller
    region(id: ID!): Region
    country(id: ID!): Country
    # By name
    countryByAlias(alias: String!): Country
    regionByAlias(alias: String!): Region

    # Find many
    whiskys: [Whisky]! # Use proper grammar for plural? Whiskys vs Whiskies
    distillers: [Distiller]!
    countries: [Country]!
    regions: [Region]!
  }

  type Mutation {
    createDistiller(
      countryId: String!
      name: String!
      regionId: String
    ): Distiller
    createWhisky(
      distillerId: String!
      name: String!
      blended: Boolean!
      age: Int
    ): Whisky

    createCountry(alias: String!, name: String!, shortName: String): Country
    createRegion(
      countryId: String!
      alias: String!
      name: String!
      shortName: String
    ): Region
  }

  type Whisky {
    id: ID!

    name: String!
    blended: Boolean!
    age: Int

    #Relationships
    # Belongs to
    distiller: Distiller!
  }

  type Distiller {
    id: ID!
    name: String!

    # Relationships
    # Belongs to
    region: Region
    country: Country!

    # Has many
    whiskys: [Whisky]
  }

  type Region {
    id: ID!

    name: String!
    shortName: String!
    alias: String!

    # Relationships
    # Belongs to
    country: Country!

    # Has many
    distillers: [Distiller]!
  }

  type Country {
    id: ID!

    name: String!
    shortName: String!
    alias: String!

    # Relationships
    # Has many
    distillers: [Distiller]!
    regions: [Region]!
  }
`;

export default typeDefs;
