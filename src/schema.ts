import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    whisky(id: ID!): Whisky

    distiller(id: ID!): Distiller
    distillers: [Distiller]!
  }

  type Mutation {
    createWhisky(name: String!): Whisky
    createDistiller(name: String!): Distiller
  }

  type Whisky {
    id: ID!
    name: String!
    age: Int
    blended: Boolean!

    #Relationships
  }

  type Distiller {
    id: ID!
    name: String!

    # Relationships
    whiskys: [Whisky]
  }
`;

export default typeDefs;
