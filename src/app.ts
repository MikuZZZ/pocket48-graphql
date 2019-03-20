import { ApolloServer } from 'apollo-server';
import schema from './schemas';
import { initDb } from './data';

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
});

const port = process.env.PORT || 8080;

initDb()
  .then(() => server.listen(port))
  .then(({ url }) => console.log(`🚀  Server ready at ${url}`));