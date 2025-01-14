import {
  GlobalOutlined,
  FileAddOutlined,
  FundViewOutlined
} from '@ant-design/icons';
import type { MenuItem } from '@/types';

export const enum MenuPath {
  HOME = 'home',
  NETWORK_CONFIG = 'network-config',
  REQUEST_VIEW = 'request-view',
  REQUEST_ADD = 'request-add'
}

export const asideNav: MenuItem[] = [
  {
    icon: <GlobalOutlined />,
    key: MenuPath.NETWORK_CONFIG,
    label: `网络配置`
  }
];

export const subAsideNav: MenuItem[] = [
  {
    icon: <FundViewOutlined />,
    key: MenuPath.REQUEST_VIEW,
    label: `查看配置`
  },
  {
    icon: <FileAddOutlined />,
    key: MenuPath.REQUEST_ADD,
    label: `添加配置`
  }
];
