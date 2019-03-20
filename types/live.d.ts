interface IMemberLivePageRequest {
  lastTime: number, //截止时间,毫秒时间戳,0为当前
  groupId: number, //团体id,详见syncsystemOverview
  type: number,
  memberId: number, //成员id,详见syncsystemOverview
  giftUpdTime: number, //礼物更新时间，用于更新礼物
  limit: number, //录播获取数量上限
}

interface IMemberLivePageResponse {
  status: number,
  message: string,
  content: {
    liveList: IMemberLiveInfo[], //liveList为正在直播的列表
    reviewList: IMemberLiveInfo[], //reviewList为录播列表
  },
}

interface IMemberLiveInfo {
  liveId: string, //直播的liveId
  title: string, //标题
  subTitle: string, //副标题
  picPath: string, //图片,电台为数组,前面需加https://source.48.cn
  startTime: number, //开始时间,毫秒时间戳
  memberId: number, //成员id
  liveType: 1 | number, //直播类型,1为视频，2为电台
  picLoopTime: number, //电台图片循环时间,毫秒
  lrcPath: string, //弹幕文件地址
  streamPath: string, //视频地址
  screenMode: number,
  roomId: string, //直播的roomId
  bwqaVersion: number
}

interface IOpenLivePageRequest {
  isReview: number, //是否为录播,1获取录播,0获取直播
  groupId: number, //团体id,详见syncsystemOverview
  userId: number,
  lastGroupId: number,
  lastTime: number,
  type: number,
  giftUpdTime: number, //礼物更新时间
  limit: number, //获取数量上限
}

interface IOpenLivePageResponse {
  status: number,
  message: string,
  content: {
    liveList: IOpenLiveOverview[],
  },
}

interface IOpenLiveOverview {
  liveId: string, //公演的liveId
  title: string, //标题,一般为公演名
  subTitle: string, //副标题,一般为队伍名或成员名
  picPath: string, //图片地址,前面需加https://source.48.cn
  isOpen: boolean, //是否正在直播
  startTime: number, //开始时间,毫秒时间戳
  count: {
    praiseCount: number,
    commentCount: number,
    memberCommentCount: number,
    shareCount: number,
    quoteCount: number,
  },
  isLike: boolean,
  groupId: number //团体id,详见syncsystemOverview
}

interface ILiveDetailRequest {
  type: number, //公演type为0或不需要,成员type为1
  liveId: string, //成员直播或公演直播的liveId
}

interface ILiveDetailResponse {
  status: number,
  message: string,
  content: IMemberLiveDetail,
}

interface ILiveDetail {
  title: string, //标题
  subTitle: string, //副标题
  picPath: string, //图片地址,前面需加https://source.48.cn
  streamPath: string, //视频地址(流畅)
  streamPathLd: string, //视频地址(高清)
  streamPathHd: string, //视频地址(超清)
  startTime: number, //开始时间
  isOpen: boolean,
  isLike: boolean,
  roomId: string, //直播的roomId
  liveType: number, //直播类型,0公演,1视频,2电台
  openLiveType: number,
  systemMessage: string,
  memberId: number, //直播的成员id
  isReview: boolean, //是否为录播,boolean则正在直播
  needForward: boolean,
  udpKey: string,
  loopTime: number,
  canVote: boolean,
  voteMemberId: number,
  number: number,
  maxChatCount: number,
  isTop: boolean,
  isSpecial: boolean,
  specialUrl: string,
  keepSeconds: number,
  lrcPath: string, //弹幕文件地址
  picLoopTime: number,
  userMoney: number,
  textMoney: number,
  textMelee: number,
  screenMode: number,
  spAchievementPath: string,
  topList: { //贡献列表
    userId: number,
    userName: string,
    userAvatar: string,
    userLevel: number,
    money: number, //贡献值
    badgePath: string,
    achievementPath: string
  }[],
  giftInfo: [],
  emoticonInfo: []
}

