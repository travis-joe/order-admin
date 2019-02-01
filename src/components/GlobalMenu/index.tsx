import React, { PureComponent } from "react";
import { Menu } from 'antd';
import { MenuTheme } from 'antd/lib/menu';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { safeArray } from '../../utils/safe.utils';
const { SubMenu, Item: MenuItem } = Menu;

export interface GlobalMenuProps {
  theme?: MenuTheme,
  history?: History,
  menus?: MenuItemConfig[]
}

export interface MenuItemConfig {
  title: string,
  key?: string,
  to?: string,
  sub?: MenuItemConfig[]
}

class GlobalMenu extends PureComponent<GlobalMenuProps> {
  static defaultProps?: GlobalMenuProps = {
    theme: 'dark',
  }

  render() {
    const { theme, history: { location: { pathname } }, menus } = this.props;

    function getMenuItemPath(item: MenuItemConfig) {
      let key = item.key || item.to || item.title
      if (item.to) {
        return item.to === pathname
          ? <MenuItem key={key}>{item.title}</MenuItem>
          : <MenuItem key={key}>
              <Link to={item.to}>{item.title}</Link>
            </MenuItem>
      } else {
        return (
          <SubMenu key={key} title={item.title}>
            {item.sub.map(item => getMenuItemPath(item))}
          </SubMenu>
        )
      }
    }

    return (
      <Menu
        mode="inline"
        theme={theme}
        selectedKeys={[pathname]}
        defaultOpenKeys={[`${pathname.split('/').slice(0, -1).join('/')}`]}>
        {safeArray(menus).map(item => getMenuItemPath(item))}
      </Menu>
    )
  }
}

export default GlobalMenu;
