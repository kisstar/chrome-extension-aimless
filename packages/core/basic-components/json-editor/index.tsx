import React, { useState, useMemo } from 'react';
import { ConfigProvider, Radio } from 'antd';
import ReactJson from 'react-json-view';
import Editor, { type OnMount, type OnChange } from '@monaco-editor/react';
import { isString } from '@/shared';
import './index.scss';

interface JsonEditorProps {
  code: object | string;
  onParseError?: (error: unknown) => void;
}

type EditorMode = 'raw' | 'view' | 'edit';

const JsonEditor: React.FC<JsonEditorProps> = ({
  code,
  onParseError
}: JsonEditorProps) => {
  const [mode, setMode] = useState<EditorMode>('view');

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
  const onChange: OnChange = () => {
    // console.log('onChange', newValue);
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
      <div className="csa-json-editor">
        {mode === 'raw' ? (
          <pre className="csa-json-editor__code">{codeStr}</pre>
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

        <div className="csa-json-editor__tool">
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
