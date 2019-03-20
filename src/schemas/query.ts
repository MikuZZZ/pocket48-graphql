import db, { memberNameFilter } from '@Src/data';

const typeDef = `
  type Query {
    groups(name: String): [Group]!
    teams(name: String): [Team]!
    members(name: String): [Member]!
  }
`;

const resolver = {
  Query: {
    groups: (_0, { name }) => db.getCollection('groups').find({ group_name: { $regex: name }, group_id: { $ne: 0 } }),
    teams: (_0, { name }) => db.getCollection('teams').find({ team_name: { $regex: name }, team_id: { $ne: 0 } }),
    members: (_0, { name }) => db.getCollection('members').where((member) => memberNameFilter(member, name)),
  }
};

export default { typeDef, resolver };
