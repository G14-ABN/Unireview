'use client'
import React, { useState, useEffect } from 'react';
import {HomeOutlined
} from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { PopUp } from '../../areaPersonale/review/reviewPopUp';
import { Mod } from '../../areaPersonale/moderatori';
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

function MenuPages(name : string, ref : string, auth : string|null){
        var items: MenuItem[]
        const popup= PopUp()
        if (auth){
            items = [getItem('Area personale', 'sub1', <HomeOutlined />, [
                getItem('Switch to english', 'sub6',
                    <a href={'./en'+'/?token='+auth}/>),
                getItem('Compila recensione', 'sub3', popup),
                getItem(name, 'sub4', <a href= {ref+'/?token='+auth}/>),
                getItem('Contatta moderatori','sub2', Mod() ),
                getItem('Log Out', 'sub5', <a href='./'/>),
                ]),
            ]
        }else{
        items = [getItem('Area personale', 'sub1', <HomeOutlined />, [
            getItem('Switch to english', 'sub6',
                <a href='./en'/>),
                getItem('Log In', 'sub3', <a href='http://localhost:8080/auth/google/callback'/>),
                ]),
            ]
        }

        return (
            <div style={{ width: "100%" }}>
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
