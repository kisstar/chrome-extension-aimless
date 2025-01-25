import React, { useState } from 'react';
import JsonEditor from '@/basic-components/json-editor';
import '@/entrypoints/options/views/tools/json/index.scss';

const App: React.FC = () => {
  const [json, setJson] = useState('');

  const onChange = (value?: string) => {
    setJson(value || '');
  };

  return <JsonEditor defaultMode="edit" code={json} onChange={onChange} />;
};

export default App;
