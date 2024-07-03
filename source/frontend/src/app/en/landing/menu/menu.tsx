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

const BASE_URI = process.env.BASE_URI;

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
        const mod = Mod()
        if (auth){
            items = [getItem('Personal Area', 'sub1', <HomeOutlined />, [
                getItem('Passa a italiano', 'sub6',
                    <a href={'../'+'/?token='+auth}/>),
                getItem('New review', 'sub3', popup),
                getItem(name, 'sub4', <a href= {ref+'/?token='+auth}/>),
                getItem('Contact moderator','sub2', mod ),
                getItem('Log Out', 'sub5', <a href='./'/>),
                ]),
            ]
        }else{
        items = [getItem('Personal Area', 'sub1', <HomeOutlined />, [
            getItem('Switch to italian', 'sub6',
                <a href='../'/>),
                getItem('Log In', 'sub3', <a href='BASE_URI/auth/google/callback'/>),
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
