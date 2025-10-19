import React from 'react';
import { Menu, ConfigProvider } from 'antd';
import { menuItems } from '@/entrypoints/popup/constants';
import { MENU_ITEM_KEY } from '@/entrypoints/popup/constants';
import { openOptionsPage } from '@/shared';
import type { MenuProps } from 'antd';

const PopupMenu: React.FC = () => {
  const onClick: MenuProps['onClick'] = (info) => {
    switch (info.key) {
      case MENU_ITEM_KEY.NETWORK_CONFIG:
        openOptionsPage({
          url: chrome.runtime.getURL(
            'options.html#/network-config/request-view'
          )
        });
        break;
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            activeBarBorderWidth: 0
          }
        }
      }}
    >
      <Menu
        style={{ width: 256 }}
        mode="inline"
        items={menuItems}
        selectable={false}
        onClick={onClick}
      />
    </ConfigProvider>
  );
};

export default PopupMenu;
