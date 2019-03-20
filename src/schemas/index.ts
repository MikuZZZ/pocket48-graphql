import { gql } from 'apollo-server';
import { makeExecutableSchema } from 'apollo-server'

import Group from './group';
import Query from './query';
import Member from './member';
import Team from './team';
import Period from './period';
import Live from './live';

const SchemaDefinition = gql`
  schema {
    query: Query
  }
`;

export default makeExecutableSchema({
  resolvers: Object.assign(
    Group.resolver,
    Query.resolver,
    Member.resolver,
    Team.resolver,
    Period.resolver,
    Live.resolver,
  ),
  typeDefs: [
    SchemaDefinition,
    Query.typeDef,
    Group.typeDef,
    Member.typeDef,
    Team.typeDef,
    Period.typeDef,
    Live.typeDef,
  ],
});