import { Checkbox, Input, JsonView } from '@aimless/ui'
import React, { useEffect, useState } from 'react'
import { parseURL } from './parse-url'
import './index.scss'

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
