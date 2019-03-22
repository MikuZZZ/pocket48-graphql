import { gql } from 'apollo-server';
import db, { memberNameFilter } from '@Src/data';

const typeDef = gql`
  type Period {
    period_id: Int,
    group_id: Int,
    period_name: String,
    
    group: Group!
    members(name: String, team: String): Members!
  }
`;

const resolver = {
  Period: {
    group: (period: IPeriodInfo) => db.groups().findOne({ group_id: { $eq: period.period_id } }),
    members: (period: IPeriodInfo, { name, team }) => {
      const chain = db.members().chain();
      chain.find({ period: { $eq: period.period_id } });
      if (team) {
        const matchedTeam = db.teams().findOne({ team_name: { $regex: `^(TEAM ){0,1}${team.toUpperCase()}` }, team_id: { $ne: 0 } });
        chain.find({ team: { $eq: matchedTeam.team_id } });
      }
      if (name) {
        chain.where((member) => memberNameFilter(member, name));
      }
      return chain;
    },
  }
};

export default { typeDef, resolver };
