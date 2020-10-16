import * as dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server';

import typeDefs from './schema';

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  engine: {
    apiKey: process.env.APOLLO_KEY,
    // experimental_schemaReporting: true,
    // ...internalEngineDemo, // TODO: Figure this out
  },
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Apollo GraphQL server is running at: ${url}\n\n`);
});
