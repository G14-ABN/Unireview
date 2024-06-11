'use client'
import React, { useState, useEffect } from 'react';
import {HomeOutlined
} from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { PopUp } from '@/app/areaPersonale/createReview/reviewPopUp';
import {login} from '@/app/areaPersonale/login/login';
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
    name 
    ref

    constructor (name : string, ref : string){
        this.name = name
        this.ref = ref
    }

    Pages(auth : boolean) {
        var items: MenuItem[]
        if (auth){
            items = [getItem('Area personale', 'sub1', <HomeOutlined />, [
                getItem('Compila recensione', 'sub3', PopUp()),
                getItem(this.name, 'sub4', <a href= {this.ref}/>),
                getItem('Log Out', 'sub5', <a href='./'/>),
                ]),
            ]
        }else{
        items = [getItem('Area personale', 'sub1', <HomeOutlined />, [
                getItem('Log In', 'sub3', <a href='http://localhost:8080/auth/google/callback'/>),
                ]),
            ]
        }

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
}
