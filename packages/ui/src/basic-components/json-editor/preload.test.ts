import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => {
  class EditorWorker {}
  class JsonWorker {}
  class CssWorker {}
  class HtmlWorker {}
  class TypeScriptWorker {}

  return {
    CssWorker,
    EditorWorker,
    HtmlWorker,
    JsonWorker,
    TypeScriptWorker,
    loader: { config: vi.fn(), init: vi.fn() },
    monaco: {},
  }
})

vi.mock('@monaco-editor/react', () => ({ loader: mocks.loader }))
vi.mock('monaco-editor', () => mocks.monaco)
vi.mock('monaco-editor/esm/vs/editor/editor.worker?worker', () => ({ default: mocks.EditorWorker }))
vi.mock('monaco-editor/esm/vs/language/css/css.worker?worker', () => ({ default: mocks.CssWorker }))
vi.mock('monaco-editor/esm/vs/language/html/html.worker?worker', () => ({ default: mocks.HtmlWorker }))
vi.mock('monaco-editor/esm/vs/language/json/json.worker?worker', () => ({ default: mocks.JsonWorker }))
vi.mock('monaco-editor/esm/vs/language/typescript/ts.worker?worker', () => ({ default: mocks.TypeScriptWorker }))

describe('monaco worker routing', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it.each([
    ['json', mocks.JsonWorker],
    ['css', mocks.CssWorker],
    ['scss', mocks.CssWorker],
    ['less', mocks.CssWorker],
    ['html', mocks.HtmlWorker],
    ['handlebars', mocks.HtmlWorker],
    ['razor', mocks.HtmlWorker],
    ['typescript', mocks.TypeScriptWorker],
    ['javascript', mocks.TypeScriptWorker],
    ['editorWorkerService', mocks.EditorWorker],
  ])('为 %s 使用对应 worker', async (label, Worker) => {
    await import('./preload')

    expect(globalThis.MonacoEnvironment?.getWorker?.('', label)).toBeInstanceOf(Worker)
  })
})
