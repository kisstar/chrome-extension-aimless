import { loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'

// 在插件中使用时，不允许加载远程脚本
if (!location.protocol.startsWith('http')) {
  globalThis.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === 'json') {
        return new JsonWorker()
      }

      return new EditorWorker()
    },
  }
  loader.config({ monaco })
  loader.init()
}
