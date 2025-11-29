interface RequestOptions {
  params?: string | string[][] | Record<string, string> | URLSearchParams
  headers?: HeadersInit
}

/**
 * @param {string} url 请求地址
 * @param {RequestOptions} options 请求配置
 */
export function request(url: string, options: RequestOptions = {}) {
  const { params, headers } = options
  const urlInstance = new URL(url)
  const originSearchParamsStr = urlInstance.searchParams.toString()
  const searchParamsStr = new URLSearchParams(params).toString()
  const resultSearchParamsStr = originSearchParamsStr + searchParamsStr
  const requestUrl = `${urlInstance.origin}${urlInstance.pathname}?${resultSearchParamsStr}${urlInstance.hash}`

  return fetch(requestUrl, {
    headers,
  })
}
