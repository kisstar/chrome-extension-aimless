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
function findSelectedKeys(items?: MenuItem[], pathname = '') {
  const key = items?.filter((item) => {
    if (!item) {
      return false;
    }

    if (pathname.indexOf('/' + item.key) + 1) {
      return true;
    }
  })[0]?.key;

  return key ? [key + ''] : [];
}

const App: React.FC<MainLayoutProps> = ({
  headerNav,
  asideNav,
  subAsideNav
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const headerMenuSelectedKeys = findSelectedKeys(headerNav, pathname);
  const asideMenuSelectedKeys = findSelectedKeys(asideNav, pathname);
  const subAsideMenuSelectedKeys = findSelectedKeys(subAsideNav, pathname);

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
        {/* 头部导航栏 */}
        <Header>
          <div
            className="cea-main-layout__brand"
            onClick={() => navigate('/')}
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
          >
            <img src="/logo.svg" alt="logo" />
            <div className="cea-main-layout__title">
              <span className="cea-main-layout__title--main">Aimless</span>
              <span className="cea-main-layout__title--sub">
                Nothing Means Everything
              </span>
            </div>
          </div>
          <Menu
            mode="horizontal"
            items={headerNav}
            selectedKeys={headerMenuSelectedKeys}
            onSelect={({ key }) => navigate(`/${key}`)}
          />
        </Header>
        {/* 主体内容 */}
        <Layout className="cea-main-layout__body">
          {/* 一级导航栏 */}
          <Sider width={124}>
            <Menu
              className="cea-main-layout__aside-nav-1"
              items={asideNav}
              selectedKeys={asideMenuSelectedKeys}
              onSelect={({ key }) => navigate(`/${key}`)}
            />
          </Sider>
          {/* 二级导航栏 */}
          <Sider width={200}>
            <Menu
              className="cea-main-layout__aside-nav-2"
              mode="inline"
              items={subAsideNav}
              selectedKeys={subAsideMenuSelectedKeys}
              onSelect={({ key }) =>
                navigate(`/${asideMenuSelectedKeys[0]}/${key}`)
              }
            />
          </Sider>
          {/* 内容区域 */}
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
