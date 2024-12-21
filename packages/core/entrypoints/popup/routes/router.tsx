import { createBrowserRouter } from 'react-router-dom';
import Home from '@/entrypoints/popup/views/home/Home';
import RequestAddConfig from '@/entrypoints/popup/views/request/AddConfig';

const router = createBrowserRouter([
  {
    path: '/popup.html',
    element: <Home />
  },
  {
    path: '/request',
    children: [
      {
        path: 'add-config',
        element: <RequestAddConfig />
      }
    ]
  }
]);

export { router };
