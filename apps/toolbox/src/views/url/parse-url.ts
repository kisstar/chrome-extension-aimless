interface ParseURLOptions {
  decode?: boolean
}

export function parseURL(url = '', options: ParseURLOptions = {}) {
  try {
    if (!url)
      return {}

    const { decode = true } = options
    const urlObj = new URL(url)
    const query: Record<string, string> = {}

    if (decode) {
      urlObj.searchParams.forEach((value, key) => {
        query[key] = value
      })
    }
    else {
      new URLSearchParams(urlObj.search).forEach((_, key) => {
        const match = urlObj.search.match(new RegExp(`(?:[?&])${key}=([^&]*)`))
        query[key] = match?.[1] ?? ''
      })
    }

    return {
      url,
      href: urlObj.href,
      origin: urlObj.origin,
      protocol: urlObj.protocol,
      host: urlObj.host,
      hostname: urlObj.hostname,
      port: urlObj.port,
      pathname: urlObj.pathname,
      search: urlObj.search,
      query,
      hash: urlObj.hash,
    }
  }
  catch {
    return {}
  }
}
