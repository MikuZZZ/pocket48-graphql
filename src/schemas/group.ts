import { gql } from 'apollo-server';
import db, { memberNameFilter } from '@Src/data';

const typeDef = gql`
  type Group {
    group_id: String!
    group_name: String!
    info: String!
    
    teams(name: String): [Team]!
    members(name: String): Members!
  }
`;

const resolver = {
  Group: {
    teams: (group, { name }) => db.getCollection('teams').find({ group_id: { $eq: group.group_id }, team_name: { $regex: name } }),
    members: (group, { name }) => db.getCollection('members')
      .chain()
      .find({ team: { $between: [group.group_id * 100, group.group_id * 100 + 99] } })
      .where((member) => memberNameFilter(member, name)),
  }
};

export default { typeDef, resolver };
