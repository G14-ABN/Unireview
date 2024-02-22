'use client'
import React, { useState } from 'react';
import {HomeOutlined
} from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
export {Pages};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode ,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}



const items: MenuItem[] = [

    getItem('Area personale', 'sub1', <HomeOutlined />, [
    getItem('Login', '5'),
    getItem('Le mie recensioni', '6', <a href='./myReview'/>),
    getItem('Contatta moderatori', '7'),
    ]),
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
            //inlineCollapsed={collapsed}
            items={items}
        />
        </div>
    );
};

