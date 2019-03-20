import { ApolloServer } from 'apollo-server';
import schema from './schemas'

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
});

const port = process.env.PORT || 8080;

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen(port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});