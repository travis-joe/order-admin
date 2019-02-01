import React from 'react';
import { Layout } from 'antd';
import GlobalMenu, { MenuItemConfig } from '../components/GlobalMenu';
import { Link } from 'react-router-dom';
import { History, Location } from 'history';
import styles from './index.less';
const { Content, Sider, Header } = Layout;

export type BasicLayoutComponent<P> = React.SFC<P>;

export interface BasicLayoutProps extends React.Props<any> {
  history?: History;
  location?: Location;
}

const menus: MenuItemConfig[] = [
  {
    title: '订单列表',
    to: '/orders/list',
  },
  {
    title: '商品列表',
    to: '/products/list',
  },
  {
    title: '设置',
    key: '/settings',
    sub: [
      {
        title: '基本信息',
        to: '/settings/basic',
      },
    ],
  }
]

const BasicLayout: BasicLayoutComponent<BasicLayoutProps> = props => {
  const { children } = props;
  return (
    <Layout hasSider className={styles.main}>
      <Sider>
        <Link to="/" className={styles.logo}>
          点餐系统后台
        </Link>
        <GlobalMenu {...props} menus={menus} />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          header
        </Header>
        <Content className={styles.content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
