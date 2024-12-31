import React from 'react';
import ReactDOM from 'react-dom/client';
// import JsonEditorPage from './pages/JsonEditor';
import RequestManagePage from './pages/request-manage';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <JsonEditorPage /> */}
    <RequestManagePage />
  </React.StrictMode>
);
