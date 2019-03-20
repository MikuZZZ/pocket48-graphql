import Loki from 'lokijs';
import * as Pocket48API from './api';

const db = new Loki('pocket48-data');

let updateTime = null;

const syncSystem = () => {
  const body = {
    videoTypeUtime: updateTime || "2010-03-24 15:59:11",
    musicAlbumUtime: updateTime || "2010-04-18 14:45:37",
    functionUtime: updateTime || "2010-10-17 15:00:00",
    groupUtime: updateTime || "2010-10-17 17:27:00",
    memberInfoUtime: updateTime || "2010-10-20 11:55:09",
    talkUtime: updateTime || "2010-05-05 18:04:52",
    videoUtime: updateTime || "2010-05-17 18:36:32",
    musicUtime: updateTime || "2010-05-05 15:56:11",
    urlUtime: updateTime || "2010-07-19 12:10:59",
    teamUtime: updateTime || "2010-10-20 10:39:00",
    memberPropertyUtime: updateTime || "2010-02-20 18:57:48",
    periodUtime: updateTime || "2010-10-14 14:45:00",
  };

  return Pocket48API.syncSystemOverView(body)
    .then(({ data }) => loadData(data));
}

const createDb = () => {
  db.addCollection('members', { indices: ['member_id'] });
  db.addCollection('groups', { indices: ['group_id'] });
  db.addCollection('teams', { indices: ['team_id'] });
  db.addCollection('periods', { indices: ['period_id'] });
}

const loadData = (data) => {
  db.getCollection('members').insert(data.content.memberInfo);
  db.getCollection('groups').insert(data.content.group);
  db.getCollection('teams').insert(data.content.team);
  db.getCollection('periods').insert(data.content.period);

  updateTime = '2019-03-19 00:00:00';
}

export const memberNameFilter = (member, name) => {
  if (!name) {
    return true;
  }

  const shortPinYinMatch = name.match(/[a-zA-Z]+/) && member.pinyin.replace(/[^A-Z]/g, '').toLowerCase().startsWith(name.toLowerCase());
  const realNameMatch = member.real_name.indexOf(name) !== -1;
  const pinYinMatch = member.pinyin.toLowerCase().indexOf(name) !== -1;

  return shortPinYinMatch || realNameMatch || pinYinMatch;
}

createDb();
loadData(require('../../2019-03-19 00-00-00.json'));

export default db;
