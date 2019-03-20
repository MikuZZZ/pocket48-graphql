import Loki from 'lokijs';
import { DateTime } from 'luxon';
import * as Pocket48API from './api';

const db = new Loki('pocket48-data');

db.addCollection('members', { indices: ['member_id'] });
db.addCollection('groups', { indices: ['group_id'] });
db.addCollection('teams', { indices: ['team_id'] });
db.addCollection('periods', { indices: ['period_id'] });
db.addCollection('member_lives', { indices: ['liveId'] });

let systemUpdateTime: string = null;
const systemDataUpdateInterval = 60 * 60 * 1000; // 1h in ms
const liveDataUpdateInterval = 5 * 60 * 1000; // 5m in ms

const syncSystemData = async () => {
  const body: ISyncSystemOverviewRequest = {
    videoTypeUtime: systemUpdateTime || "2010-03-24 15:59:11",
    musicAlbumUtime: systemUpdateTime || "2010-04-18 14:45:37",
    functionUtime: systemUpdateTime || "2010-10-17 15:00:00",
    groupUtime: systemUpdateTime || "2010-10-17 17:27:00",
    memberInfoUtime: systemUpdateTime || "2010-10-20 11:55:09",
    talkUtime: systemUpdateTime || "2010-05-05 18:04:52",
    videoUtime: systemUpdateTime || "2010-05-17 18:36:32",
    musicUtime: systemUpdateTime || "2010-05-05 15:56:11",
    urlUtime: systemUpdateTime || "2010-07-19 12:10:59",
    teamUtime: systemUpdateTime || "2010-10-20 10:39:00",
    memberPropertyUtime: systemUpdateTime || "2010-02-20 18:57:48",
    periodUtime: systemUpdateTime || "2010-10-14 14:45:00",
  };

  await Pocket48API.syncSystemOverView(body)
    .then((data) => {
      db.getCollection('members').insert(data.memberInfo);
      db.getCollection('groups').insert(data.group);
      db.getCollection('teams').insert(data.team);
      db.getCollection('periods').insert(data.period);

      systemUpdateTime = DateTime.local().setZone('Asia/Shanghai').toFormat('yyyy-MM-dd HH:mm:ss');
      setTimeout(() => syncSystemData().catch(console.error), systemDataUpdateInterval);

      const nextUpdatetime = DateTime.local().plus({ milliseconds: systemDataUpdateInterval }).toString();
      console.info(`System data updated. Next update scheduled on ${nextUpdatetime}`);
    })
    .catch(console.error);
}

const syncLiveData = async () => {
  const fetchLimit = 20;
  const body: IMemberLivePageRequest = {
    lastTime: 0,
    groupId: 0, // All group
    type: 0,
    memberId: 0, // All member
    giftUpdTime: DateTime.local().setZone('Asia/Shanghai').toMillis(), // Should never update, use current time.
    limit: fetchLimit,
  };

  const fetchNewLiveInfo = async (lastTime?: number) => {
    const { reviewList: liveList } = await Pocket48API.fetchMemberLivePage(lastTime ? Object.assign(body, { lastTime }) : body);
    const existingLiveId = db.getCollection<IMemberLiveInfo>('member_lives').find({ liveId: { $in: liveList.map((l) => l.liveId) } }).map((l) => l.liveId);
    const newLiveRecord = liveList.filter((l) => !existingLiveId.includes(l.liveId));

    newLiveRecord.forEach((r) => console.info(`New member live added: ${r.liveId} ${r.title}`));

    db.getCollection('member_lives').insert(newLiveRecord);
    if (newLiveRecord.length === fetchLimit) {
      return fetchNewLiveInfo(liveList[liveList.length - 1].startTime);
    }
  }

  const liveCachedCount = db.getCollection('member_lives').count({});
  if (liveCachedCount === 0) {
    const { content: { reviewList: liveData } } = require('../../memberLivePage-1553103813545.json') as IMemberLivePageResponse;
    db.getCollection('member_lives').insert(liveData);
  }

  await fetchNewLiveInfo()
    .then(() => {
      setTimeout(() => syncLiveData().catch(console.error), liveDataUpdateInterval);

      const nextUpdatetime = DateTime.local().plus({ milliseconds: liveDataUpdateInterval }).toString();
      console.info(`Live data updated. Next update scheduled on ${nextUpdatetime}`);
    })
    .catch(console.error);
}

export const initDb = () => Promise.all([
  syncSystemData(),
  syncLiveData(),
]);

export default {
  members: db.getCollection<IMemberInfo>('members'),
  groups: db.getCollection<IGroupInfo>('groups'),
  teams: db.getCollection<ITeamInfo>('teams'),
  periods: db.getCollection<IPeriodInfo>('periods'),
  member_lives: db.getCollection<IMemberLiveInfo>('member_lives'),
};

export const memberNameFilter = (member: IMemberInfo, name: string) => {
  if (!name) {
    return true;
  }

  const shortPinYinMatch = name.match(/[a-zA-Z]+/) && member.pinyin.replace(/[^A-Z]/g, '').toLowerCase().startsWith(name.toLowerCase());
  const realNameMatch = member.real_name.indexOf(name) !== -1;
  const pinYinMatch = member.pinyin.toLowerCase().indexOf(name) !== -1;

  return shortPinYinMatch || realNameMatch || pinYinMatch;
}
