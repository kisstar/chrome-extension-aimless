import type { DiffOnMount } from '@monaco-editor/react'
import { DiffEditor } from '@monaco-editor/react'
import React from 'react'
import '../json-editor/preload'

interface CodeDiffEditorProps {
  original: string
  modified: string
  language?: string
  theme?: 'light' | 'dark'
  onOriginalChange?: (value: string) => void
  onModifiedChange?: (value: string) => void
}

const CodeDiffEditor: React.FC<CodeDiffEditorProps> = ({
  original,
  modified,
  language = 'typescript',
  theme = 'light',
  onOriginalChange,
  onModifiedChange,
}) => {
  const onMount: DiffOnMount = (editor) => {
    const originalEditor = editor.getOriginalEditor()
    const modifiedEditor = editor.getModifiedEditor()
    originalEditor.onDidChangeModelContent(() => {
      onOriginalChange?.(originalEditor.getValue())
    })
    modifiedEditor.onDidChangeModelContent(() => {
      onModifiedChange?.(modifiedEditor.getValue())
    })
  }

  return (
    <DiffEditor
      original={original}
      modified={modified}
      language={language}
      onMount={onMount}
      theme={theme === 'light' ? 'vs' : 'vs-dark'}
      options={{
        automaticLayout: true,
        diffAlgorithm: 'advanced',
        ignoreTrimWhitespace: false,
        minimap: { enabled: false },
        originalEditable: true,
        renderSideBySide: true,
        scrollBeyondLastLine: false,
        wordWrap: 'off',
      }}
    />
  )
}

export default CodeDiffEditor
