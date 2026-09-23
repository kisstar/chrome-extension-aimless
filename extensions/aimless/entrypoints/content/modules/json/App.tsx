import { JsonEditor } from '@aimless/ui'
import React, { useState } from 'react'

const App: React.FC<{ code: string }> = ({ code }) => {
  const [json, setJson] = useState(code)

  const onChange = (value?: string) => {
    setJson(value || '')
  }

  return <JsonEditor code={json} onChange={onChange} />
}

export default App
