'use client'
import React, { useState } from 'react';
import {HomeOutlined
} from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { PopUp } from '@/app/areaPersonale/createReview/reviewPopUp';
export {MenuPages};

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

class MenuPages{

    items: MenuItem[]

    constructor (name : string, ref : string){
        this.items = [

            getItem('Area personale', 'sub1', <HomeOutlined />, [
            getItem('Login', 'sub2'),
            getItem('Compila recensione', 'sub3', new PopUp().Page()),
            getItem(name, 'sub4', <a href= {ref}/>),
            getItem('Contatta moderatori', 'sub5'),
            ]),
        ];
    }

    Pages() {

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
                items={this.items}
            />
            </div>
        );
    };
}
