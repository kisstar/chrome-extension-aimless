import React from 'react';
import { Menu, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '779413cd-ccd2-4ffb-b86f-cdd665c4a5cb',
    label: '网络管理',
    type: 'group',
    children: [
      { key: '5f872e98-65a3-4afc-9274-39668505d057', label: '添加配置' },
      { key: 'bd39ad9b-daf7-4d44-8c4c-f4f142f80a54', label: '查看配置' }
    ]
  }
];

const PopupMenu: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
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
        items={items}
        selectable={false}
        onClick={onClick}
      />
    </ConfigProvider>
  );
};

export default PopupMenu;
