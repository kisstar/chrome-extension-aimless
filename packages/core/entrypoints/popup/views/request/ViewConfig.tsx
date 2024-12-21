import { Menu, Splitter } from 'antd';
import ReactJson from 'react-json-view';
import { useRequestStore } from '@/entrypoints/popup/stores';

const ViewConfig: React.FC = () => {
  const { getMenuItems, getCurrentMenuItem, selectedKeys, setSelectedKeys } =
    useRequestStore();
  const menuItems = getMenuItems();

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
    <Splitter style={{ width: 550 }}>
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
