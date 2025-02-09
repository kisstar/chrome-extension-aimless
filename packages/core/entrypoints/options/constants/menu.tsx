import {
  ToolOutlined,
  GlobalOutlined,
  FileAddOutlined,
  FundViewOutlined,
  RadarChartOutlined,
  JavaScriptOutlined
} from '@ant-design/icons';
import type { MenuItem } from '@/types';

export const enum MenuPath {
  HOME = 'home',
  // 网络配置
  NETWORK_CONFIG = 'network-config',
  REQUEST_VIEW = 'request-view',
  REQUEST_ADD = 'request-add',
  // 工具
  NORMAL_TOOL = 'normal-tool',
  TOOL_JSON = 'json'
}

// 头部导航菜单
export const headerNav: MenuItem[] = [
  {
    icon: <ToolOutlined />,
    key: MenuPath.NORMAL_TOOL,
    label: '工具箱'
  }
];

// 配置页侧边导航菜单
export const asideNav: MenuItem[] = [
  {
    icon: <GlobalOutlined />,
    key: MenuPath.NETWORK_CONFIG,
    label: '网络配置'
  }
];

export const subAsideNav: MenuItem[] = [
  {
    icon: <FundViewOutlined />,
    key: MenuPath.REQUEST_VIEW,
    label: '查看配置'
  },
  {
    icon: <FileAddOutlined />,
    key: MenuPath.REQUEST_ADD,
    label: '添加配置'
  }
];

// 工具页侧边导航菜单
export const toolAsideNav: MenuItem[] = [
  {
    icon: <RadarChartOutlined />,
    key: MenuPath.NORMAL_TOOL,
    label: '基础工具'
  }
];

export const toolSubAsideNav: MenuItem[] = [
  {
    icon: <JavaScriptOutlined />,
    key: MenuPath.TOOL_JSON,
    label: 'JSON 处理工具'
  }
];
