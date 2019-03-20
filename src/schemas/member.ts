import { gql } from 'apollo-server';
import db from '@Src/data';

const typeDef = gql`
  type Members {
    current: [Member]!
    former: [Member]!
  }

  type Member {
    member_id: Int
    real_name: String
    pinyin: String
    nick_name: String
    avatar: String
    jtime: String
    wb_uid: String
    wb_name: String
    city: Int
    height: Int
    blood_type: String
    birthday: String
    constellation: String
    star_region: String
    birthplace: String
    specialty: String
    hobbies: String
    full_photo_1: String
    full_photo_2: String
    full_photo_3: String
    full_photo_4: String
    status: Int

    firstTeam: Team!
    group: Group!
    team: Team!
    period: Period!
    lives(count: Int): [MemberLive!]
  }
`;

const resolver = {
  Members: {
    current: (chain: Resultset<any>) => chain.copy().find({ status: { $eq: 1 } }).data(),
    former: (chain: Resultset<any>) => chain.copy().find({ status: { $ne: 1 } }).data(),
  },
  Member: {
    team: (member: IMemberInfo) => db.teams.findOne({ team_id: { $eq: member.team } }),
    firstTeam: (member: IMemberInfo) => db.teams.findOne({ team_id: { $eq: member.first_team } }),
    group: (member: IMemberInfo) => db.groups.findOne({ group_id: { $eq: member.team / 100 } }),
    period: (member: IMemberInfo) => db.periods.findOne({ period_id: { $eq: member.period } }),
    lives: (member: IMemberInfo, { count }) => db.member_lives.chain()
      .find({ memberId: { $eq: member.member_id } })
      .simplesort('startTime', true)
      .limit((!count || count > 20) ? 20 : count)
      .data(),
  }
};

export default { typeDef, resolver };