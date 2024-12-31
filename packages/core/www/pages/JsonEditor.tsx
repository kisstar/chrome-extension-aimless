import JsonEditor from '@/basic-components/json-editor';
import pkg from '../../package.json';

import React from 'react';

const JsonEditorPage: React.FC = () => {
  return <JsonEditor code={pkg} />;
};

export default JsonEditorPage;
