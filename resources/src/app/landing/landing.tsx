import React from 'react';
import { Layout, Flex } from 'antd';
import logo from './logo.png';
import { Interfaccia } from './interfaccia/interfaccia';
import { Pages } from './menu/menu';
import { Search } from './search/search';
export {Landing}

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#000000',
  height: 100,
  //paddingInline: 48,
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
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#ffffff',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#000000',
  backgroundColor: '#ffffff',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  //width: 'calc(50% - 8px)',
  //maxWidth: 'calc(50% - 8px)',
};

function Landing(){
    return (
    <Flex>
    <Layout style={layoutStyle}>
      <Sider width="18%" style={siderStyle}>
        {Interfaccia()}
        {Pages()}
      </Sider>
      <Layout>
        <Header style={headerStyle}>
            <img src = {logo.src} height={100} width={100}/>
        </Header>
        <Header style={headerStyle}>
            <h1>
            UniReview
            </h1>
        </Header>
        <Content style={contentStyle}>
            {Search()}
        </Content>
        <Footer style={footerStyle}>
            
        </Footer>
      </Layout>
    </Layout>
  </Flex>
);
}