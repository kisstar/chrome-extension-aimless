import * as monaco from 'monaco-editor';
import { loader } from '@monaco-editor/react';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

// 在插件中使用时，不允许加载远程脚本
if (!location.protocol.startsWith('http')) {
  self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === 'json') {
        return new jsonWorker();
      }

      return new editorWorker();
    }
  };
  loader.config({ monaco });
  loader.init();
}
