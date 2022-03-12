/**
 * @description 获取 MP4 链接地址进行下载
 */

import { downloadByFetch as download, IOS_UA } from '@utils';

const { __INITIAL_STATE__: initState } = window;
const { videoData } = initState;
const { aid = '', cid = '' } = videoData;
const paramList = [
  ['platform', 'html5'],
  ['otype', 'json'],
  ['type', 'mp4'],
  ['html5', '1'],
  ['qn', '16'],
  ['avid', aid],
  ['cid', cid],
];
const params = new URLSearchParams(paramList).toString();

fetch(`https://api.bilibili.com/x/player/playurl?${params}`, {
  headers: {
    accept: 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9',
    'user-agent': IOS_UA,
  },
})
  .then(res => res.json())
  .then(res => {
    const { data = {} } = res;
    const { durl = [] } = data;
    const urlInfo = durl[0];
    const { url = '' } = urlInfo;
    const filename = document.title.replace('_哔哩哔哩_bilibili', '');

    download(url, `${filename}.mp4`, { type: 'video/mp4' });
  })
  .catch(() => {});
