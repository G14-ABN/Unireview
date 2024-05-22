import React, { useState } from 'react';
import { Layout, Flex } from 'antd';
import logo from './logo.png'
import { Interfaccia } from '@/app/landing/interfaccia/interfaccia';
import { MenuPages } from '@/app/landing/menu/menu';
export {PageModel}


/*const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#000000',
  height: 100,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#ffffff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#ffffff',
};

const siderStyle: React.CSSProperties = {
  //textAlign: 'center',
  //lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#ffffff',
};

const footerStyle: React.CSSProperties = {
  //textAlign: 'center',
  color: '#000000',
  backgroundColor: '#ffffff',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  //width: 'calc(50% - 8px)',
  //maxWidth: 'calc(50% - 8px)',
};

class PageModel{

    name : String
    ref : string
    refName : string
    body : React.JSX.Element

    constructor(name : String, body : React.JSX.Element, refName : string, ref : string){
        this.body = body
        this.name = name
        this.ref = ref
        this.refName = refName
    }

    pageModel(){
        return (
        <Flex>
            <Layout style={layoutStyle}>
                <Sider width="18%" style={siderStyle}>
                    {Interfaccia()}
                    {new MenuPages(this.refName, this.ref).Pages()}
                </Sider>
                <Layout>
                    <Header style={headerStyle}>
                        <img src = {logo.src} height={100} width={100}/>
                    </Header>
                    <Header style={headerStyle}>
                        <h1>
                            {this.name}
                        </h1>
                    </Header>
                    <Content style={contentStyle}>
                        {this.body}
                    </Content>
                    <Footer style={footerStyle}/>    
                </Layout>
            </Layout>
        </Flex>
        );
    }

}*/

const { Header, Footer, Sider, Content } = Layout;

class PageModel{

    name : String
    ref : string
    refName : string
    body : React.JSX.Element

    constructor(name : String, body : React.JSX.Element, refName : string, ref : string){
        this.body = body
        this.name = name
        this.ref = ref
        this.refName = refName
    }

    pageModel(){
        const styles : React.CSSProperties[]=[
            {
                borderRadius: 8,
                overflow: 'hidden',
            },{
                textAlign: 'center',
                color: '#000000',
                height: 100,
                paddingInline: 48,
                lineHeight: '64px',
                backgroundColor: '#ffffff',
            }, {
                textAlign: 'center',
                minHeight: 120,
                lineHeight: '120px',
                color: '#fff',
                backgroundColor: '#ffffff',
            }, {
                color: '#fff',
                backgroundColor: '#ffffff',
            }, {
                color: '#000000',
                backgroundColor: '#ffffff',
              }
        ]
        const [stylesState, stylesChange] = useState(styles)
        return (
        <Flex>
            <Layout style={stylesState[0]}>
                <Sider width="18%" style={stylesState[3]}>
                    {Interfaccia(stylesState, stylesChange)}
                    {new MenuPages(this.refName, this.ref).Pages()}
                </Sider>
                <Layout>
                    <Header style={stylesState[1]}>
                        <img src = {logo.src} height={100} width={100}/>
                    </Header>
                    <Header style={stylesState[1]}>
                        <h1>
                            {this.name}
                        </h1>
                    </Header>
                    <Content style={stylesState[2]}>
                        {this.body}
                    </Content>
                    <Footer style={stylesState[4]}/>    
                </Layout>
            </Layout>
        </Flex>
        );
    }

}