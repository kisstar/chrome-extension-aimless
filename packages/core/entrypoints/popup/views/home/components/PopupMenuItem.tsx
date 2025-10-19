import React, { useCallback } from 'react';
import { Checkbox } from 'antd';
import { useRequestStore } from '@/entrypoints/options/stores';
import { MENU_ITEM_KEY } from '@/entrypoints/popup/constants';

interface PopupMenuProps {
  id: string;
  label: string;
}

const PopupMenuItem: React.FC<PopupMenuProps> = ({ id, label }) => {
  const requestStore = useRequestStore();
  const checked = (() => {
    switch (id) {
      case MENU_ITEM_KEY.NETWORK_CONFIG:
        return requestStore.enable;
    }
  })();
  const onChange = useCallback(() => {
    switch (id) {
      case MENU_ITEM_KEY.NETWORK_CONFIG:
        requestStore.toggleEnable();
        break;
    }
  }, [id]);

  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {label}
    </Checkbox>
  );
};

export default PopupMenuItem;
