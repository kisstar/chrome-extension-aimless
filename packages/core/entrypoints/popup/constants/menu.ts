import type { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

export const enum MenuItemKey {
  ADD_REQUEST_CONFIG = '5f872e98-65a3-4afc-9274-39668505d057',
  VIEW_REQUEST_CONFIG = 'bd39ad9b-daf7-4d44-8c4c-f4f142f80a54'
}

export const menuItems: MenuItem[] = [
  {
    key: '779413cd-ccd2-4ffb-b86f-cdd665c4a5cb',
    label: '网络管理',
    type: 'group',
    children: [
      { key: MenuItemKey.ADD_REQUEST_CONFIG, label: '添加配置' },
      { key: MenuItemKey.VIEW_REQUEST_CONFIG, label: '查看配置' }
    ]
  }
];
