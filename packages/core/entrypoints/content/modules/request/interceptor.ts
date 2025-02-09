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

export function registerInterceptors() {
  window.fetch = customFetch;
  window.XMLHttpRequest = CustomXMLHttpRequest;
  addXHResponseInterceptor(overrideXMLHttpResponseInterceptor);
  addFetchResponseInterceptor(overrideResponseInterceptor);
}
