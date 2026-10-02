import type { ReactElement, ReactNode } from 'react'
import { Children, isValidElement } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import DiffPage from './Diff'

const mocks = vi.hoisted(() => ({
  CodeDiffEditor: vi.fn(() => null),
  useState: vi.fn(),
}))

vi.mock('@aimless/ui', () => ({
  CodeDiffEditor: mocks.CodeDiffEditor,
}))

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>()
  return {
    ...actual,
    useState: mocks.useState,
  }
})

type TestElement = ReactElement<Record<string, unknown>>

function findElements(node: ReactNode, predicate: (element: TestElement) => boolean): TestElement[] {
  return Children.toArray(node).flatMap((child) => {
    if (!isValidElement(child))
      return []

    const element = child as TestElement
    const nested = findElements(element.props.children as ReactNode, predicate)
    return predicate(element) ? [element, ...nested] : nested
  })
}

function renderPage(values?: { original: string, modified: string }) {
  const setLanguage = vi.fn()
  const setOriginal = vi.fn()
  const setModified = vi.fn()
  mocks.useState
    .mockImplementationOnce((initial: unknown) => [initial, setLanguage])
    .mockImplementationOnce((initial: unknown) => [values?.original ?? initial, setOriginal])
    .mockImplementationOnce((initial: unknown) => [values?.modified ?? initial, setModified])

  const page = (DiffPage as () => ReactElement)()
  const editor = findElements(page, element => element.type === mocks.CodeDiffEditor)[0]
  const buttons = findElements(page, element => element.type === 'button')

  return { buttons, editor, page, setModified, setOriginal }
}

describe('diffPage', () => {
  beforeEach(() => {
    mocks.useState.mockReset()
  })

  it('左右编辑器初始为空并接收各自变更', () => {
    const { editor } = renderPage()

    expect(editor.props.original).toBe('')
    expect(editor.props.modified).toBe('')
    expect(editor.props.onOriginalChange).toBeTypeOf('function')
    expect(editor.props.onModifiedChange).toBeTypeOf('function')
  })

  it('仅保留浮动操作区', () => {
    const { page } = renderPage()

    expect(findElements(page, element => element.props.className === 'cea-diff__header')).toHaveLength(0)
    expect(findElements(page, element => element.props.className === 'cea-diff__labels')).toHaveLength(0)
    expect(findElements(page, element => element.props.className === 'cea-diff__actions')).toHaveLength(1)
  })

  it('交换或清空当前两侧内容', () => {
    const { buttons, setModified, setOriginal } = renderPage({
      original: 'before',
      modified: 'after',
    })
    const swapButton = buttons.find(button => button.props.children === '交换内容')
    const clearButton = buttons.find(button => button.props.children === '清空')

    expect(swapButton).toBeDefined()
    expect(clearButton).toBeDefined()
    ;(swapButton?.props.onClick as () => void)()
    expect(setOriginal).toHaveBeenCalledWith('after')
    expect(setModified).toHaveBeenCalledWith('before')

    ;(clearButton?.props.onClick as () => void)()
    expect(setOriginal).toHaveBeenCalledWith('')
    expect(setModified).toHaveBeenCalledWith('')
  })
})
