import { createEl } from './dom';

interface DownloadOptions {
  downloadType: 'tag' | 'fetch';
  filename?: string;
  fileProp?: FilePropertyBag;
}

/**
 * 通过 HTML a 标签下载资源
 * @param url 资源地址
 * @param filename 文件名
 */
export function downloadByTag(url: string, filename?: string) {
  const aEl = createEl(
    'a',
    {
      href: url,
    },
    {
      download: filename || url,
    },
  );

  aEl.style.display = 'none';
  document.body.appendChild(aEl);
  aEl.click();
  document.body.removeChild(aEl);
}

/**
 * 通过请求下载资源
 * @param url 资源地址
 * @param filename 文件名
 * @param fileProp 文件属性
 */
export function downloadByFetch(url: string, filename: string, fileProp: FilePropertyBag) {
  fetch(url)
    .then(res => res.blob())
    .then(blobData => new File([blobData], filename, fileProp))
    .then(fileData => {
      const objUrl = URL.createObjectURL(fileData);

      downloadByTag(objUrl);
      URL.revokeObjectURL(objUrl);
    });
}

export function downloader(url: string, options?: DownloadOptions) {
  const { filename, downloadType = 'fetch', fileProp } = options || {};

  if (downloadType === 'tag') {
    return downloadByTag(url, filename);
  }

  return downloadByFetch(url, filename, fileProp);
}
