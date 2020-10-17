import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    whisky(id: ID!): Whisky
    whiskys: [Whisky]! # Use proper grammar for plural? Whiskys vs Whiskies
    distiller(id: ID!): Distiller
    distillers: [Distiller]!
  }

  type Mutation {
    createWhisky(
      distillerId: String!
      name: String!
      blended: Boolean!
      age: Int
    ): Whisky
    createDistiller(name: String!): Distiller
  }

  type Whisky {
    id: ID!
    name: String!
    age: Int
    blended: Boolean!

    #Relationships
    distiller: Distiller
  }

  type Distiller {
    id: ID!
    name: String!

    # Relationships
    whiskys: [Whisky]
  }
`;

export default typeDefs;
