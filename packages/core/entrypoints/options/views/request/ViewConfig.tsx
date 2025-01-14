import React, { useMemo } from 'react';
import { Button, Empty, Menu, Splitter, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import ReactJson from 'react-json-view';
import { MenuPath } from '@/entrypoints/options/constants';
import { useRequestStore } from '@/entrypoints/options/stores';
import { isMenuDivider } from '@/shared';
import MenuItemComp from '@/entrypoints/options/views/request/components/MenuItem';
import type { MenuItem } from '@/shared';

const ViewConfig: React.FC = () => {
  const {
    list,
    getMenuItems,
    getCurrentMenuItem,
    selectedKeys,
    setSelectedKeys,
    deleteConfig
  } = useRequestStore();
  const navigate = useNavigate();

  const handleDelete = (item: MenuItem) => {
    const key = item?.key;

    if (key) {
      deleteConfig(key);
    }
  };

  const menuItems = useMemo(() => {
    return getMenuItems().map((item) => {
      if (!isMenuDivider(item)) {
        const nItem = {
          ...item,
          label: <MenuItemComp menuInfo={item} handleDelete={handleDelete} />
        } as MenuItem;

        return nItem;
      }

      return item;
    });
  }, [list]);

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

  const content = (
    <Splitter>
      <Splitter.Panel defaultSize="30%" min="20%" max="70%">
        <Menu
          mode="inline"
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
  const emptyComp = (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      description={<Typography.Text>No Data</Typography.Text>}
    >
      <Button
        type="primary"
        onClick={() =>
          navigate(`/${MenuPath.NETWORK_CONFIG}/${MenuPath.REQUEST_ADD}`)
        }
      >
        去创建
      </Button>
    </Empty>
  );

  return menuItems.length ? content : emptyComp;
};

export default ViewConfig;
