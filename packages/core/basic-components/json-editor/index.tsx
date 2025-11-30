import React, { useState, useMemo } from 'react';
import { ConfigProvider, Radio } from 'antd';
import ReactJson from 'react-json-view';
import Editor, { type OnMount, type OnChange } from '@monaco-editor/react';
import { isString } from '@chrome-extension-aimless/shared';
import './preload';
import './index.scss';

type EditorMode = 'raw' | 'view' | 'edit';

interface JsonEditorProps {
  defaultMode?: EditorMode;
  code: object | string;
  onParseError?: (error: unknown) => void;
  onChange?: OnChange;
}

const JsonEditor: React.FC<JsonEditorProps> = ({
  defaultMode,
  code,
  onParseError,
  onChange
}: JsonEditorProps) => {
  const [mode, setMode] = useState<EditorMode>(defaultMode || 'view');

  const codeStr = useMemo(() => {
    if (isString(code)) return code;

    return JSON.stringify(code, null, 2);
  }, [code]);
  const codeObj = useMemo(() => {
    try {
      return JSON.parse(codeStr);
    } catch (error: unknown) {
      if (onParseError) {
        onParseError(error);
      }

      return {};
    }
  }, [codeStr]);

  const onEditorDidMount: OnMount = (editor) => {
    editor.focus();
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Radio: {
            buttonBg: 'rgba(0, 0, 0, 0.05)',
            buttonCheckedBg: 'rgba(0, 0, 0, 0.1)'
          }
        }
      }}
    >
      <div className="cea-json-editor">
        {mode === 'raw' ? (
          <pre className="cea-json-editor__code">{codeStr}</pre>
        ) : mode === 'view' ? (
          <ReactJson
            src={codeObj}
            iconStyle="square"
            displayDataTypes={false}
          />
        ) : (
          <Editor
            defaultLanguage="json"
            defaultValue={codeStr}
            onChange={onChange}
            onMount={onEditorDidMount}
          />
        )}

        <div className="cea-json-editor__tool">
          <Radio.Group value={mode} onChange={(e) => setMode(e.target.value)}>
            <Radio.Button value="raw">Raw</Radio.Button>
            <Radio.Button value="view">查看</Radio.Button>
            <Radio.Button value="edit">编辑</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default JsonEditor;
