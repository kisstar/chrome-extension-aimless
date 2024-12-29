import { Menu, Splitter } from 'antd';
import ReactJson from 'react-json-view';
import { useRequestStore } from '@/entrypoints/popup/stores';
import { isMenuDivider } from '@/shared';
import MenuItemComp from '@/entrypoints/popup/views/request/components/MenuItem';
import type { MenuItem } from '@/shared';

const ViewConfig: React.FC = () => {
  const {
    getMenuItems,
    getCurrentMenuItem,
    selectedKeys,
    setSelectedKeys,
    deleteConfig
  } = useRequestStore();

  const handleDelete = (item: MenuItem) => {
    const key = item?.key;

    if (key) {
      deleteConfig(key);
    }
  };

  const menuItems = getMenuItems().map((item) => {
    if (!isMenuDivider(item)) {
      const nItem = {
        ...item,
        label: <MenuItemComp menuInfo={item} handleDelete={handleDelete} />
      } as MenuItem;

      return nItem;
    }

    return item;
  });

  function setDefaultSelectedKeys() {
    if (menuItems.length && !selectedKeys.length) {
      const menuItem = menuItems[0];

      if (menuItem?.key) setSelectedKeys([menuItem.key + '']);
    }
  }

  const currentJSON = () => {
    const menuItem = getCurrentMenuItem();

    if (!menuItem) return {};

    return {
      menu: JSON.parse(menuItem.response_content || '{}')
    };
  };

  const onSelect = ({ key }: { key: string }) => {
    if (key) setSelectedKeys([key]);
  };

  // Set default selected menu item
  setDefaultSelectedKeys();

  return (
    <Splitter style={{ width: 750 }}>
      <Splitter.Panel defaultSize="30%" min="20%" max="70%">
        <Menu
          mode="inline"
          style={{ height: '100%' }}
          items={menuItems}
          defaultSelectedKeys={selectedKeys}
          onSelect={onSelect}
        />
      </Splitter.Panel>
      <Splitter.Panel>
        <ReactJson
          src={currentJSON()}
          iconStyle="square"
          displayDataTypes={false}
        />
      </Splitter.Panel>
    </Splitter>
  );
};

export default ViewConfig;
