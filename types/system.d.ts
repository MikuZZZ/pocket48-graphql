interface ISyncSystemOverviewRequest { //各种更新时间
  videoTypeUtime: string,
  musicAlbumUtime: string,
  functionUtime: string,
  groupUtime: string,
  memberInfoUtime: string,
  talkUtime: string,
  videoUtime: string,
  musicUtime: string,
  urlUtime: string,
  teamUtime: string,
  memberPropertyUtime: string,
  periodUtime: string
}

interface ISyncSystemOverviewResponse {
  status: number,
  message: string,
  content: {
    group: IGroupInfo[],
    team: ITeamInfo[],
    memberInfo: IMemberInfo[],
    period: IPeriodInfo[],
    memberProperty: IMemberPorpertyInfo[],
    propertyMember: IMemberPropertyMap[],
  }
}

interface IGroupInfo {
  group_id: number, //团体的groupId
  group_name: string, //名称
  ctime: string, //创建时间
  utime: string, //更新时间
  info: string,
}

interface ITeamInfo {
  team_id: number, //队伍teamId
  group_id: number, //从属的groupId
  team_name: string, //名称
  full_logo: string, //LOGO
  logo1: string,
  logo2: string,
  avatar_background: string, //背景图片
  color: string, //队伍颜色
  status: number, //队伍状态
  ctime: string, //创建时间
  utime: string, //更新时间
}

interface IPeriodInfo {
  period_id: number, //期数的periodId
  group_id: number, //从属的groupId
  period_name: string, //名称
  ctime: string,
  utime: string,
}

interface IMemberInfo {
  member_id: number, //成员的memberId
  ctime: string, //创建时间
  utime: string, //更新时间
  real_name: string, //姓名
  pinyin: string, //拼音
  nick_name: string, //昵称
  team: number, //所属队伍的teamId
  period: number, //所属期数的periodId
  avatar: string, //头像
  jtime: string, //加入时间
  wb_uid: string, //微博uid
  wb_name: string, //微博名称
  city: number, //所属团体的groupId
  height: number, //身高,cm
  blood_type: string, //血型
  birthday: string, //生日
  constellation: string, //星座
  star_region: string,
  birthplace: string, //出生地
  specialty: string, //特长
  hobbies: string, //爱好
  full_photo_1: string, //公式照
  full_photo_2: string,
  full_photo_3: string,
  full_photo_4: string,
  status: 1, //状态,1正常,2暂休,0,-1退团
  first_team: number, //初始队伍的teamId
  sid: number,
  sno: number,
}

interface IMemberPorpertyInfo {
  property_id: number,
  parent_id: number,
  title: string,
  status: number,
  ctime: string,
  utime: string,
}

interface IMemberPropertyMap {
  property_id: number,
  member_id: number,
}
