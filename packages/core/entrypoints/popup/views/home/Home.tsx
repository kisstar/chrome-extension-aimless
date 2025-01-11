import PopupMenu from '@/entrypoints/popup/views/home/components/PopupMenu';
import type { MenuProps } from 'antd';

const Home: React.FC = () => {
  const onClick: MenuProps['onClick'] = () => {};

  return <PopupMenu onClick={onClick} />;
};

export default Home;
