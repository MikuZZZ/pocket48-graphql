import { gql } from 'apollo-server';
import db, { memberNameFilter } from '@Src/data';

const typeDef = gql`
  type Query {
    groups(name: String): [Group]!
    teams(name: String): [Team]!
    members(name: String): [Member]!
    memberLive(id: String!): MemberLive
  }
`;

const resolver = {
  Query: {
    groups: (_0, { name }) => db.groups.find({ group_name: { $regex: name }, group_id: { $ne: 0 } }),
    teams: (_0, { name }) => db.teams.find({ team_name: { $regex: name }, team_id: { $ne: 0 } }),
    members: (_0, { name }) => db.members.where((member) => memberNameFilter(member, name)),
    memberLive: (_0, { id }) => db.member_lives.findOne({ liveId: { $eq: id } }),
  }
};

export default { typeDef, resolver };
