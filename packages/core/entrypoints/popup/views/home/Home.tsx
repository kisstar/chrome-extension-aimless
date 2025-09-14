import PopupMenu from '@/entrypoints/popup/views/home/components/PopupMenu';
import { MENU_ITEM_KEY } from '@/entrypoints/popup/constants';
import { openOptionsPage } from '@/shared';
import type { MenuProps } from 'antd';

const Home: React.FC = () => {
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

  return <PopupMenu onClick={onClick} />;
};

export default Home;
