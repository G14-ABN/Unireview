'use client'
import React, { useState } from 'react';
import { Tema } from '../interfaccia/tema';
import {HomeOutlined
} from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu } from 'antd';
export {Pages};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}



const items: MenuItem[] = [
    //getItem('Le mie recensioni', '1', <ContainerOutlined />),
    //getItem('Login', '2', <DesktopOutlined />),
    //getItem('Option 3', '3', <ContainerOutlined />),

    getItem('Area personale', 'sub1', <HomeOutlined />, [
    getItem('Login', '5'),
    getItem('Le mie recensioni', '6'),
    getItem('Contatta moderatori', '7'),
    //getItem('Option 8', '8'),
    ]),

    //getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    //getItem('Option 9', '9'),
    //getItem('Option 10', '10'),

    //getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  //]),
];

function Pages() {

    //const [collapsed, setCollapsed] = useState(false);

    /*const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };*/

    return (
        <div style={{ width: 256 }}>
            {/*<Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>*/}
        <Menu 
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme={Tema.getTema()? "light" as MenuTheme: "dark" as MenuTheme}
            //inlineCollapsed={collapsed}
            items={items}
        />
        </div>
    );
};

