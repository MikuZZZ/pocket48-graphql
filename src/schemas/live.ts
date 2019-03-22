import { gql } from 'apollo-server';
import { DateTime } from 'luxon';
import db, { memberNameFilter } from '@Src/data';

const typeDef = gql`
  type MemberLive {
    liveId: String
    title: String
    subTitle: String
    picPath: String
    startTime: String
    memberId: Int
    liveType: Int
    picLoopTime: Int
    lrcPath: String
    streamPath: String
    screenMode: Int
    roomId: String
    bwqaVersion: Int

    member: Member!
  }
`;

const resolver = {
  MemberLive: {
    startTime: (live: IMemberLiveInfo) => DateTime.fromMillis(live.startTime).toISO(),
    member: (live: IMemberLiveInfo) => db.members().findOne({ member_id: { $eq: live.memberId } }),
  }
};

export default { typeDef, resolver };
