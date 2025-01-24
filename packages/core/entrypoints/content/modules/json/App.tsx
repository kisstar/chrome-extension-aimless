import React, { useState } from 'react';
import JsonEditor from '@/basic-components/json-editor';

const App: React.FC<{ code: string }> = ({ code }) => {
  const [json, setJson] = useState(code);

  const onChange = (value?: string) => {
    setJson(value || '');
  };

  return <JsonEditor code={json} onChange={onChange} />;
};

export default App;
