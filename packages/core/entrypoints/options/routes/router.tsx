import { createHashRouter, Navigate } from 'react-router-dom';
import {
  MenuPath,
  headerNav,
  asideNav,
  subAsideNav,
  toolAsideNav,
  toolSubAsideNav
} from '@/entrypoints/options/constants';
import { MainLayout } from '@/basic-components/layout';
import Home from '@/entrypoints/options/views/home/Home';
// config
import RequestAddConfig from '@/entrypoints/options/views/request/AddConfig';
import ViewConfig from '@/entrypoints/options/views/request/ViewConfig';
// tools
import JsonTool from '@/entrypoints/options/views/tools/json/Json';

const router = createHashRouter([
  {
    path: '/',
    element: (
      // 重定向到网络配置查看页面
      <Navigate to={`${MenuPath.NETWORK_CONFIG}/${MenuPath.REQUEST_VIEW}`} />
    )
  },
  {
    // 首页
    path: MenuPath.HOME,
    element: <Home />
  },
  {
    // 网络配置
    path: MenuPath.NETWORK_CONFIG,
    element: (
      <MainLayout
        headerNav={headerNav}
        asideNav={asideNav}
        subAsideNav={subAsideNav}
      />
    ),
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
  },
  {
    // 工具列表
    path: MenuPath.NORMAL_TOOL,
    element: (
      <MainLayout
        headerNav={headerNav}
        asideNav={toolAsideNav}
        subAsideNav={toolSubAsideNav}
      />
    ),
    children: [
      {
        path: MenuPath.TOOL_JSON,
        element: <JsonTool />
      }
    ]
  }
]);

export { router };
