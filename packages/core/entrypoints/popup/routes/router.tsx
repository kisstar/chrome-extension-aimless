import { createBrowserRouter } from 'react-router-dom';
import Home from '@/entrypoints/popup/views/home/Home';
import RequestAddConfig from '@/entrypoints/popup/views/request/AddConfig';
import ViewConfig from '@/entrypoints/popup/views/request/ViewConfig';

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
      },
      {
        path: 'view-config',
        element: <ViewConfig />
      }
    ]
  }
]);

export { router };
