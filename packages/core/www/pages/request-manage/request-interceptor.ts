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

export async function overrideResponseInterceptor(ctx: FetchResponseContext) {
  const { response } = ctx;

  const resultResponse = new Response(
    `{
    "message": "https://images.dog.ceo/breeds/newfoundland/n02111277_3653.jpg1",
    "status": "success"
}`,
    {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    }
  );

  ctx.response = resultResponse;

  return ctx;
}

export async function overrideXMLHttpResponseInterceptor(
  ctx: XMLHttpResponseContext
) {
  ctx.responseText = `{
    "message": "https://images.dog.ceo/breeds/newfoundland/n02111277_3653.jpg1",
    "status": "success"
}`;

  return ctx;
}

export function registerInterceptors() {
  window.fetch = customFetch;
  window.XMLHttpRequest = CustomXMLHttpRequest;
  addXHResponseInterceptor(overrideXMLHttpResponseInterceptor);
  addFetchResponseInterceptor(overrideResponseInterceptor);
}

registerInterceptors();
