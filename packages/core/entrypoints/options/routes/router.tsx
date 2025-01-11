import { createBrowserRouter } from 'react-router-dom';
import Home from '@/entrypoints/options/views/home/Home';
import RequestAddConfig from '@/entrypoints/options/views/request/AddConfig';
import ViewConfig from '@/entrypoints/options/views/request/ViewConfig';

const router = createBrowserRouter([
  {
    path: '/options.html',
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
