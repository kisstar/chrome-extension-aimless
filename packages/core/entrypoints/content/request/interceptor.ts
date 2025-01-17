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

async function overrideResponseInterceptor(ctx: FetchResponseContext) {
  // const { response } = ctx;

  // const resultResponse = new Response('', {
  //   status: response.status,
  //   statusText: response.statusText,
  //   headers: response.headers
  // });

  // ctx.response = resultResponse;

  return ctx;
}

async function overrideXMLHttpResponseInterceptor(ctx: XMLHttpResponseContext) {
  // ctx.responseText = '';

  return ctx;
}

export function registerInterceptors() {
  window.fetch = customFetch;
  window.XMLHttpRequest = CustomXMLHttpRequest;
  addXHResponseInterceptor(overrideXMLHttpResponseInterceptor);
  addFetchResponseInterceptor(overrideResponseInterceptor);
}
