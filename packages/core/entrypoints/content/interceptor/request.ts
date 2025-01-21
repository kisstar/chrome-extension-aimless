import {
  CustomXMLHttpRequest,
  customFetch,
  addFetchResponseInterceptor,
  addXHResponseInterceptor
} from '@chrome-extension-aimless/shared';
import type {
  FetchResponseContext,
  XMLHttpResponseContext
} from '@chrome-extension-aimless/shared';
import { useRequestStore } from '@/entrypoints/content/stores';

async function overrideResponseInterceptor(ctx: FetchResponseContext) {
  const { getRequestConfig } = useRequestStore();
  const userConfig = getRequestConfig();
  const { response, requestMethod, requestURL } = ctx;
  const fetchUrl = requestURL.toString();

  // 查找匹配的配置项
  const matchedConfig = userConfig.find((item) => {
    return (
      item.request_method === requestMethod &&
      (item.request_url === '*' ||
        fetchUrl.includes(item.request_url) ||
        item.request_url.includes(fetchUrl))
    );
  });

  if (matchedConfig) {
    const resultResponse = new Response('', {
      status: response.status,
      statusText: matchedConfig.response_content,
      headers: response.headers
    });

    ctx.response = resultResponse;
  }

  return ctx;
}

async function overrideXMLHttpResponseInterceptor(ctx: XMLHttpResponseContext) {
  const { getRequestConfig } = useRequestStore();
  const userConfig = getRequestConfig();
  const { requestMethod, requestURL } = ctx;
  const fetchUrl = requestURL.toString();

  // 查找匹配的配置项
  const matchedConfig = userConfig.find((item) => {
    return (
      item.request_method === requestMethod &&
      (item.request_url === '*' ||
        fetchUrl.includes(item.request_url) ||
        item.request_url.includes(fetchUrl))
    );
  });

  if (matchedConfig) {
    ctx.status = 200;
    ctx.responseText = matchedConfig.response_content;
  }

  return ctx;
}

export function registerInterceptors() {
  window.fetch = customFetch;
  window.XMLHttpRequest = CustomXMLHttpRequest;
  addXHResponseInterceptor(overrideXMLHttpResponseInterceptor);
  addFetchResponseInterceptor(overrideResponseInterceptor);
}
