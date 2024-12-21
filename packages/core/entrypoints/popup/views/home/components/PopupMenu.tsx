import React from 'react';
import { Menu, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import { menuItems } from '@/entrypoints/popup/constants';

interface PopupMenuProps {
  onClick?: MenuProps['onClick'];
}

const PopupMenu: React.FC<PopupMenuProps> = ({ onClick }) => {
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
