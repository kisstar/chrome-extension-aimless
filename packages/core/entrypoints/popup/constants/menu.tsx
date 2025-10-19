import type { MenuItem } from '@/types';
import PopupMenuItem from '@/entrypoints/popup/views/home/components/PopupMenuItem';

export const MENU_ITEM_KEY = {
  CONFIG_MANAGE: '779413cd-ccd2-4ffb-b86f-cdd665c4a5cb',
  NETWORK_CONFIG: '10573c8d-1ac6-4a3f-bce7-a0e3d746bb52'
} as const;

export const menuItems: MenuItem[] = [
  {
    key: MENU_ITEM_KEY.CONFIG_MANAGE,
    label: '配置管理',
    type: 'group',
    children: [
      {
        label: (
          <PopupMenuItem id={MENU_ITEM_KEY.NETWORK_CONFIG} label="网络配置" />
        ),
        key: MENU_ITEM_KEY.NETWORK_CONFIG
      }
    ]
  }
];
