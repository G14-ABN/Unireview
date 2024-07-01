import React, { useState } from 'react';
import { Layout, Flex, ConfigProvider } from 'antd';
import logo from './logo.png'
import { Interfaccia } from '../interfaccia/interfaccia';
import { MenuPages } from '../menu/menu';
import { UtenteAutenticato, Start } from '../../areaPersonale/users/utenteAutenticato';
import { Elimina } from '../../areaPersonale/review/elimina';
import { GetModal, Patch } from '../../areaPersonale/review/modifica';
export {PageModel}


const { Header, Footer, Sider, Content } = Layout;

function PageModel(name : String, body : React.JSX.Element, refName : string, ref : string){
 
    const token = new URLSearchParams(window.location.search).get('token')
    const lightBase = "#f8c7c2"
    const lightFill = "#faeeec"
    const lightText ="#2a1617"
    const darkBase = "#2a1617"
    const darkFill = "#431c1d"
    const darkText ="#faeeec"
    const lightSider="#e8706b"
    const darkSider="#792b2b"
    const lightFooter="#d24040"
    const darkFooter="#431c1d"
        UtenteAutenticato.token=token
        Start()
        new Elimina()
        new Patch()
        const [dark, stylesChange] = useState(UtenteAutenticato.temaUI)
        const styles : React.CSSProperties[]=[
            {
                borderRadius: 8,
                overflow: 'hidden',
            },{
                textAlign: 'center',
                color: dark?darkText:lightText,
                height: 100,
                paddingInline: 48,
                lineHeight: '64px',
                backgroundColor: dark?darkBase:lightBase,
            }, {
                textAlign: 'center',
                minHeight: 120,
                lineHeight: '120px',
                color: dark?darkText:lightText,
                backgroundColor: dark?darkBase:lightBase,
            }, {
                color: dark?darkText:lightText,
                maxWidth:"20%",
                backgroundColor: dark?darkSider:lightSider,
            }, {
                color: dark?darkText:lightText,
                backgroundColor: dark?darkFooter:lightFooter,
              }
        ]
        return (
        <ConfigProvider
        theme={{
          token: {
            colorText: dark?darkText:lightText,
            colorBgContainer:dark?darkFill:lightFill,
            colorTextDescription: dark?darkText:lightText,
            colorPrimary:"#a63636",
            colorBgElevated:dark?darkBase:lightBase,
          },
        }}>
        <Flex>
            <Layout style={styles[0]}>
                <Sider width="18%" style={styles[3]}>
                    {Interfaccia(dark, stylesChange)}
                    {MenuPages(refName, ref,token)}
                </Sider>
                <Layout>
                    <Header style={styles[1]}>
                        <img src = {logo.src} height={100} width={100}/>
                    </Header>
                    <Header style={styles[1]}>
                        <h1>
                            {name}
                        </h1>
                    </Header>
                    <Content style={styles[2]}>
                        {body}
                    </Content>
                    <Footer style={styles[4]}>
                        For any issue contact:
                        <br/>
                        unireview.unitn@gmail.com
                    </Footer>    
                </Layout>
            </Layout>
        </Flex>
        </ConfigProvider>
        );
    }