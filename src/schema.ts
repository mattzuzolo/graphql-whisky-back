import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    # Find one
    # By id
    whisky(id: ID!): Whisky
    producer(id: ID!): Producer
    region(id: ID!): Region
    country(id: ID!): Country

    # By alias
    countryByAlias(alias: String!): Country
    regionByAlias(alias: String!): Region

    # Find many
    whiskys: [Whisky]! # Use proper grammar for plural? Whiskys vs Whiskies
    producers: [Producer]!
    countries: [Country]!
    regions: [Region]!
    styles: [Style]!
  }

  type Mutation {
    createProducer(
      countryId: String!
      name: String!
      regionId: String
    ): Producer
    createWhisky(
      producerId: String!
      name: String!
      blended: Boolean!
      age: Int
      styleId: String
    ): Whisky

    createCountry(alias: String!, name: String!, shortName: String): Country
    createRegion(
      countryId: String!
      alias: String!
      name: String!
      shortName: String
    ): Region

    createStyle(
      name: String!
      shortName: String!
      countryId: String
      regionId: String
    ): Style
  }

  type Whisky {
    id: ID!

    alias: String!
    name: String!
    blended: Boolean!
    age: Int

    # Relationships
    # Belongs to
    producer: Producer!
    style: Style!
  }

  type Style {
    id: ID!
    name: String!
    shortName: String!

    # Relationships
    # Belongs to
    region: Region
    country: Country

    # Has many
    whiskys: [Whisky]!
  }

  type Producer {
    id: ID!
    name: String!
    alias: String!

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
    producers: [Producer]!
    style: [Style]!
  }

  type Country {
    id: ID!

    name: String!
    shortName: String!
    alias: String!

    # Relationships
    # Has many
    producers: [Producer]!
    regions: [Region]!
    style: [Style]!
  }
`;

export default typeDefs;
