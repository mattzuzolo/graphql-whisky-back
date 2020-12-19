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
    producer: Producer!
  }

  type Producer {
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
    producers: [Producer]!
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
  }
`;

export default typeDefs;
