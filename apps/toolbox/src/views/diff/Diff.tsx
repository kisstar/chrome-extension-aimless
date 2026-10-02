import { CodeDiffEditor } from '@aimless/ui'
import React, { useState } from 'react'
import './index.scss'

const LANGUAGES = [
  { label: 'TypeScript', value: 'typescript' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'JSON', value: 'json' },
  { label: 'CSS', value: 'css' },
  { label: 'HTML', value: 'html' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'Go', value: 'go' },
] as const

const DiffPage: React.FC = () => {
  const [language, setLanguage] = useState('typescript')
  const [original, setOriginal] = useState('')
  const [modified, setModified] = useState('')

  const swapCode = () => {
    setOriginal(modified)
    setModified(original)
  }

  const clearCode = () => {
    setOriginal('')
    setModified('')
  }

  return (
    <main className="cea-diff">
      <div className="cea-diff__actions">
        <label className="cea-diff__language">
          <span className="cea-diff__language-label">语言</span>
          <select aria-label="语言" value={language} onChange={event => setLanguage(event.target.value)}>
            {LANGUAGES.map(item => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </label>
        <button type="button" onClick={swapCode}>交换内容</button>
        <button type="button" onClick={clearCode}>清空</button>
      </div>

      <section className="cea-diff__workspace" aria-label="代码差异编辑器">
        <div className="cea-diff__editor">
          <CodeDiffEditor
            original={original}
            modified={modified}
            language={language}
            onOriginalChange={setOriginal}
            onModifiedChange={setModified}
          />
        </div>
      </section>
    </main>
  )
}

export default DiffPage
