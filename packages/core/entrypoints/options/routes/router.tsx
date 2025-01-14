import { createHashRouter, Navigate } from 'react-router-dom';
import {
  MenuPath,
  asideNav,
  subAsideNav
} from '@/entrypoints/options/constants';
import Home from '@/entrypoints/options/views/home/Home';
import RequestAddConfig from '@/entrypoints/options/views/request/AddConfig';
import ViewConfig from '@/entrypoints/options/views/request/ViewConfig';
import { MainLayout } from '@/basic-components/layout';

const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to={MenuPath.HOME} />
  },
  {
    path: MenuPath.HOME,
    element: <Home />
  },
  {
    path: MenuPath.NETWORK_CONFIG,
    element: <MainLayout asideNav={asideNav} subAsideNav={subAsideNav} />,
    children: [
      {
        path: MenuPath.REQUEST_ADD,
        element: <RequestAddConfig />
      },
      {
        path: MenuPath.REQUEST_VIEW,
        element: <ViewConfig />
      }
    ]
  }
]);

export { router };
