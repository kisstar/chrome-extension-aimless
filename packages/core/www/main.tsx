import React from 'react';
import ReactDOM from 'react-dom/client';
import JsonEditor from '@/basic-components/json-editor';
import pkg from '../package.json';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <JsonEditor code={pkg} />
  </React.StrictMode>
);
