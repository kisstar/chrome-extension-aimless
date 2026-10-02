import { loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import TypeScriptWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

globalThis.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new JsonWorker()
    }
    if (['css', 'less', 'scss'].includes(label)) {
      return new CssWorker()
    }
    if (['handlebars', 'html', 'razor'].includes(label)) {
      return new HtmlWorker()
    }
    if (['javascript', 'typescript'].includes(label)) {
      return new TypeScriptWorker()
    }

    return new EditorWorker()
  },
}

loader.config({ monaco })
loader.init()
