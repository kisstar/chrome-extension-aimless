import { Checkbox, Input, JsonView } from '@chrome-extension-aimless/ui'
import React, { useEffect, useState } from 'react'
import './index.scss'

/**
 * 解析给定的 URL 并返回包含 URL 各部分的对象
 *
 * @param url 要解析的 URL 字符串，默认为空字符串
 * @param options 解析选项，包含是否对查询参数进行解码的选项
 * @param options.decode 是否对查询参数进行解码，默认为 true
 * @returns 包含 URL 各部分的对象
 */
function parseURL(url = '', options: { decode?: boolean } = {}) {
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
      urlObj.search.split('&').forEach((item) => {
        const [key, value] = item.split('=')

        query[key] = value
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

const URLPage: React.FC = () => {
  const [decode, setDecode] = useState(true)
  const [code, setCode] = useState('')
  const [codeObj, setCodeObj] = useState({})

  useEffect(() => {
    setCodeObj(parseURL(code, { decode }))
  }, [decode, code])

  return (
    <div className="cea-url">
      <Input
        onChange={e => setCode(e.target.value)}
        placeholder="请输入网络地址"
      />
      <p>
        <Checkbox
          checked={decode}
          onChange={e => setDecode(e.target.checked)}
        >
          解码
        </Checkbox>
      </p>
      <div className="cea-url__json-view">
        <JsonView src={codeObj} iconStyle="square" displayDataTypes={false} />
      </div>
    </div>
  )
}

export default URLPage
