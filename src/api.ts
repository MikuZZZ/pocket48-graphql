import Axios from 'axios';

const headers = {
  "Version": "5.3.1",
  "OS": "Android",
};

export const syncSystemOverView = (body) =>
  Axios.post('https://psync.48.cn/syncsystem/api/cache/v1/update/overview', body, { headers })

