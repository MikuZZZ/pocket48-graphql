import { gql } from 'apollo-server';
import db, { memberNameFilter } from '@Src/data';

const typeDef = gql`
  type Team {
    team_id: Int
    group_id: Int
    team_name: String
    full_logo: String
    logo1: String
    logo2: String
    avatar_background: String
    color: String
    status: Int

    members(name: String): Members!
    group: Group!
  }
`;

const resolver = {
  Team: {
    group: (team: ITeamInfo) => db.groups.findOne({ group_id: { $eq: team.group_id } }),
    members: (team: ITeamInfo, { name }) => db.members
      .chain()
      .find({ team: { $eq: team.team_id } })
      .where((member) => memberNameFilter(member, name)),
  }
};

export default { typeDef, resolver };
