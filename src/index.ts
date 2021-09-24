console.log('\nSTARTING...\n');
import * as dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server';

import typeDefs from './schema';
import resolvers from './resolvers';

// Context
import db from './db';
import Context from '../_types/Context';

const PORT = process.env.PORT || 4000;

const context = async (): Promise<Context> => ({
  db,
  // request, // Request used to get JWT for auth
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  engine: {
    apiKey: process.env.APOLLO_KEY,
    // experimental_schemaReporting: true,
    // ...internalEngineDemo, // TODO: Figure this out
  },
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Apollo GraphQL server is running at: ${url}\n\n`);
});
