import {
  nativeFetch,
  customFetch,
  NativeXMLHttpRequest,
  CustomXMLHttpRequest,
  addFetchResponseInterceptor,
  addXHResponseInterceptor,
  removeFetchResponseInterceptor,
  removeXHResponseInterceptor
} from '@chrome-extension-aimless/shared';
import { useRequestStore } from '@/entrypoints/content/stores';
import type {
  FetchResponseContext,
  XMLHttpResponseContext
} from '@chrome-extension-aimless/shared';

async function overrideResponseInterceptor(ctx: FetchResponseContext) {
  const { isReady, getRequestConfig } = useRequestStore();

  await isReady.promise;

  const userConfig = getRequestConfig();
  const { response, requestMethod, requestURL } = ctx;
  const fetchUrl = requestURL.toString();

  // 查找匹配的配置项
  const matchedConfig = userConfig.find((item) => {
    return (
      item.request_method.toLocaleLowerCase() ===
        requestMethod.toLocaleLowerCase() &&
      (item.request_url === '*' ||
        fetchUrl.includes(item.request_url) ||
        item.request_url.includes(fetchUrl))
    );
  });

  if (matchedConfig) {
    // const stream = new ReadableStream({
    //   start(controller) {
    //     controller.enqueue(
    //       new TextEncoder().encode(matchedConfig.response_content)
    //     );
    //     controller.close();
    //   }
    // });
    const resultResponse = new Response(matchedConfig.response_content, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });

    ctx.response = resultResponse;
  }

  return ctx;
}

async function overrideXMLHttpResponseInterceptor(ctx: XMLHttpResponseContext) {
  const { isReady, getRequestConfig } = useRequestStore();

  await isReady.promise;

  const userConfig = getRequestConfig();
  const { requestMethod, requestURL } = ctx;
  const fetchUrl = requestURL.toString();

  // 查找匹配的配置项
  const matchedConfig = userConfig.find((item) => {
    return (
      item.request_method.toLocaleLowerCase() ===
        requestMethod.toLocaleLowerCase() &&
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

/**
 * 注册请求拦截器
 * @returns 取消拦截器的函数
 */
export function registerInterceptors() {
  window.fetch = customFetch;
  window.XMLHttpRequest = CustomXMLHttpRequest;
  addXHResponseInterceptor(overrideXMLHttpResponseInterceptor);
  addFetchResponseInterceptor(overrideResponseInterceptor);
}

/**
 * 取消请求拦截器
 */
export function unregisterInterceptors() {
  window.fetch = nativeFetch;
  window.XMLHttpRequest = NativeXMLHttpRequest;
  removeXHResponseInterceptor(overrideXMLHttpResponseInterceptor);
  removeFetchResponseInterceptor(overrideResponseInterceptor);
}
