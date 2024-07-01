import React, { useState, useEffect } from 'react';
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
 
    const [token, setToken] = useState("")

  useEffect(() => {
    // Extract the token from URL
    if (typeof window != "undefined"){
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token){
        setToken(token)
    }
}
    if (token) {
      // Save token to localStorage
      window.localStorage.setItem('jwtToken', token);
      setToken(token)

      // Redirect to the home page or dashboard
    } else {
      console.error('Token not found in URL');
    }
  }, []);
  const lightBase = "#F7F8FA"
  const lightFill = "#F7F8FA"
  const lightText ="#333333"
  const lightSider="#F7F8FA"
  const lightFooter="#E1E5EA"
  const darkBase = "#2C2F33"
  const darkFill = "#23272A"
  const darkText ="#F7F8FA"
  const darkSider="#23272A"
  const darkFooter="#23272A"
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
            colorPrimary:"#E74C3C",
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