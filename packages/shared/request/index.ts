export {
  NativeXMLHttpRequest,
  default as CustomXMLHttpRequest,
  addXHResponseInterceptor,
  addXHRequestInterceptor,
  removeXHRequestInterceptor,
  removeXHResponseInterceptor,
  type XMLHttpResponseContext
} from './CustomXMLHttpRequest';

export {
  nativeFetch,
  default as customFetch,
  addFetchResponseInterceptor,
  removeFetchResponseInterceptor,
  type FetchResponseContext
} from './custom-fetch';

export { request } from './core';
