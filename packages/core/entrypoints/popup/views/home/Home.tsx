import { useNavigate } from 'react-router-dom';
import { MenuItemKey } from '@/entrypoints/popup/constants';
import PopupMenu from '@/entrypoints/popup/views/home/components/PopupMenu';
import type { MenuProps } from 'antd';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (menuInfo) => {
    if (MenuItemKey.ADD_REQUEST_CONFIG === menuInfo.key) {
      navigate('/request/add-config');
    }
  };

  return <PopupMenu onClick={onClick} />;
};

export default Home;
