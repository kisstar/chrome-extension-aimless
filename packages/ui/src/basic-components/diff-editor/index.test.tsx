import type { ReactElement } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import CodeDiffEditor from '.'

vi.mock('../json-editor/preload', () => ({}))

interface EditorElementProps {
  onMount: (editor: unknown) => void
  options: {
    originalEditable?: boolean
  }
  theme: string
}

describe('codeDiffEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('允许左右编辑并分别上报内容', () => {
    const onOriginalChange = vi.fn()
    const onModifiedChange = vi.fn()
    const originalListeners: Array<() => void> = []
    const modifiedListeners: Array<() => void> = []
    let originalValue = ''
    let modifiedValue = ''
    const element = CodeDiffEditor({
      original: '',
      modified: '',
      onOriginalChange,
      onModifiedChange,
    }) as ReactElement<EditorElementProps>

    element.props.onMount({
      getOriginalEditor: () => ({
        getValue: () => originalValue,
        onDidChangeModelContent: (listener: () => void) => originalListeners.push(listener),
      }),
      getModifiedEditor: () => ({
        getValue: () => modifiedValue,
        onDidChangeModelContent: (listener: () => void) => modifiedListeners.push(listener),
      }),
    })

    expect(element.props.options.originalEditable).toBe(true)
    originalValue = 'before'
    originalListeners[0]()
    modifiedValue = 'after'
    modifiedListeners[0]()
    expect(onOriginalChange).toHaveBeenCalledWith('before')
    expect(onModifiedChange).toHaveBeenCalledWith('after')
  })

  it('根据页面模式选择 Monaco 主题', () => {
    const defaultElement = CodeDiffEditor({
      original: '',
      modified: '',
    }) as ReactElement<EditorElementProps>
    const darkElement = CodeDiffEditor({
      original: '',
      modified: '',
      theme: 'dark',
    }) as ReactElement<EditorElementProps>

    expect(defaultElement.props.theme).toBe('vs')
    expect(darkElement.props.theme).toBe('vs-dark')
  })
})
