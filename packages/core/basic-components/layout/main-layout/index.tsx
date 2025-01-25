import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, ConfigProvider } from 'antd';
import type { MenuItem } from '@/types';
import '@/basic-components/layout/main-layout/index.scss';

const { Header, Content, Sider } = Layout;

interface MainLayoutProps {
  headerNav?: MenuItem[];
  asideNav?: MenuItem[];
  subAsideNav?: MenuItem[];
}

/**
 * 从菜单项数组中找到与给定路径名匹配的选中项的键
 *
 * @param items 菜单项数组，可选参数
 * @param pathname 要匹配的路径名，默认为空字符串
 * @returns 返回与给定路径名匹配的菜单项的键
 */
function findSelectedKey(items?: MenuItem[], pathname = '') {
  return items?.filter((item) => {
    if (!item) {
      return false;
    }

    if (pathname.indexOf('/' + item.key) + 1) {
      return true;
    }
  })[0]?.key;
}

const App: React.FC<MainLayoutProps> = ({
  headerNav,
  asideNav,
  subAsideNav
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const headerMenuSelectedKeys = [findSelectedKey(headerNav, pathname) + ''];
  const asideMenuSelectedKeys = [findSelectedKey(asideNav, pathname) + ''];
  const subAsideMenuSelectedKeys = [
    findSelectedKey(subAsideNav, pathname) + ''
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg: '#fff'
          }
        }
      }}
    >
      <Layout className="cea-main-layout">
        <Header>
          <div className="cea-main-layout__brand">
            <img src="/logo.svg" alt="logo" />
            <span className="cea-main-layout__title">
              Nothing Means Everything
            </span>
          </div>
          <Menu
            mode="horizontal"
            items={headerNav}
            defaultSelectedKeys={headerMenuSelectedKeys}
            onSelect={({ key }) => navigate(`/${key}`)}
          />
        </Header>
        <Layout className="cea-main-layout__body">
          <Sider width={124}>
            <Menu
              className="cea-main-layout__aside-nav-1"
              items={asideNav}
              defaultSelectedKeys={asideMenuSelectedKeys}
              onSelect={({ key }) => navigate(`/${key}`)}
            />
          </Sider>
          <Sider width={200}>
            <Menu
              className="cea-main-layout__aside-nav-2"
              mode="inline"
              items={subAsideNav}
              defaultSelectedKeys={subAsideMenuSelectedKeys}
              onSelect={({ key }) =>
                navigate(`/${asideMenuSelectedKeys[0]}/${key}`)
              }
            />
          </Sider>
          <Layout>
            <Content>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
