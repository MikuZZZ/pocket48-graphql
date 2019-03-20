import Axios, { AxiosPromise } from 'axios';

const headers = {
  'Version': '5.3.1',
  'OS': 'Android',
  'User-Agent': 'samsung,PRODUCT,SM-G955F/Android 4.4.2',
  'Content-Type': 'application/json;charset=utf-8',
};

export const syncSystemOverView = (body: ISyncSystemOverviewRequest) =>
  Axios.post<ISyncSystemOverviewResponse>('https://psync.48.cn/syncsystem/api/cache/v1/update/overview', body, { headers }).then((res) => res.data.content);

export const fetchMemberLivePage = (body: IMemberLivePageRequest) =>
  Axios.post<IMemberLivePageResponse>('https://plive.48.cn/livesystem/api/live/v1/memberLivePage', body, { headers }).then((res) => res.data.content);

export const fetchOpenLivePage = (body: IOpenLivePageRequest) =>
  Axios.post<IOpenLivePageResponse>('https://plive.48.cn/livesystem/api/live/v1/openLivePage', body, { headers }).then((res) => res.data.content);

export const fetchLiveDetail = (body: ILiveDetailRequest) =>
  Axios.post<ILiveDetailResponse>('https://plive.48.cn/livesystem/api/live/v1/getLiveOne', body, { headers }).then((res) => res.data.content);
