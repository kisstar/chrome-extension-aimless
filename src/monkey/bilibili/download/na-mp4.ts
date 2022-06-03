/**
 * @description 获取 MP4 链接地址进行下载
 */

import { request, download, UA_IOS } from '@utils';

const { __INITIAL_STATE__: initState } = window;
const { videoData } = initState;
const { aid = '', cid = '', title } = videoData;
const paramList = [
  ['platform', 'html5'],
  ['otype', 'json'],
  ['html5', '1'],
  ['qn', '16'],
  // required
  ['type', 'mp4'],
  ['avid', aid],
  ['cid', cid],
];

export default () => {
  request(`https://api.bilibili.com/x/player/playurl`, {
    params: paramList,
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'zh-CN,zh;q=0.9',
      'user-agent': UA_IOS,
    },
  })
    .then(res => res.json())
    .then(res => {
      const { data = {} } = res;
      const { durl = [] } = data;
      const urlInfo = durl[0];
      const { url = '' } = urlInfo;

      download(url, {
        filename: `${title}.mp4`,
        fileProp: { type: 'video/mp4' },
      });
    })
    .catch(() => {});
};
