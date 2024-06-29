'use client'
import React, { useState, useEffect } from 'react';
import {HomeOutlined
} from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { PopUp } from '@/app/en/areaPersonale/createReview/reviewPopUp';
import { mod } from '@/app/en/areaPersonale/moderatori';
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

    Pages(auth : string|null) {
        var items: MenuItem[]
        const popup= PopUp()
        console.log(this.ref)
        if (auth){
            items = [getItem('Personal space', 'sub1', <HomeOutlined />, [
                getItem('Passa a italiano', 'sub6', <a href ={'../?token='+auth} />),
                getItem('New review', 'sub3', popup),
                getItem(this.name, 'sub4', <a href={+this.ref+'/?token='+auth}/>),
                getItem('Contact moderator','sub2', mod() ),
                getItem('Log Out', 'sub5', <a href='./'/>),
                ]),
            ]
        }else{
        items = [getItem('Personal space', 'sub1', <HomeOutlined />, [
            getItem('Passa a italiano', 'sub6', <a href ='../' />),
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
}
