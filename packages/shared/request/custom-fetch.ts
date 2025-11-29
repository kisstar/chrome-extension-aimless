/**
 * see https://developer.mozilla.org/zh-CN/docs/Web/API/Window/fetch
 */

import { runInterceptors } from './interceptor'

export interface FetchResponseContext {
  response: Response
  readonly requestURL: RequestInfo | URL
  readonly requestMethod: string
}

type ResponseInterceptor = (
  ctx: FetchResponseContext,
) => Promise<FetchResponseContext>

const nativeFetch = window.fetch
const responseInterceptors: ResponseInterceptor[] = []

/**
 * 自定义的 fetch 函数，用于发送网络请求并处理响应。
 *
 * @param input 请求的资源信息，可以是 URL 字符串或 Request 对象。
 * @param init 可选的请求初始化参数，如请求方法、请求头等。
 * @returns 返回处理后的响应对象。
 */
async function customFetch(input: RequestInfo | URL, init?: RequestInit) {
  // 发送请求并获取响应
  const response = await nativeFetch(input, init)
  // 执行响应拦截器
  const ctx = await runInterceptors<FetchResponseContext>(
    responseInterceptors,
    {
      requestURL: input,
      requestMethod: init?.method || 'GET',
      response: response.clone(),
    },
  )

  if (ctx === false) {
    return response
  }

  return ctx.response
}

export function addFetchResponseInterceptor(interceptor: ResponseInterceptor) {
  responseInterceptors.push(interceptor)
}

export default customFetch
