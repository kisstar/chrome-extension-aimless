import { JsonEditor } from '@chrome-extension-aimless/ui'
import React, { useState } from 'react'
import './index.scss'

const JsonPage: React.FC = () => {
  const [json, setJson] = useState('')

  const onChange = (value?: string) => {
    setJson(value || '')
  }

  return <JsonEditor defaultMode="edit" code={json} onChange={onChange} />
}

export default JsonPage
