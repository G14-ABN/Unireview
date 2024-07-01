import React, { useState, useEffect } from 'react';
import { Layout, Flex, ConfigProvider } from 'antd';
import logo from './logo.png'
import { Interfaccia } from '../interfaccia/interfaccia';
import { MenuPages } from '../menu/menu';
import { UtenteAutenticato, Start } from '../../areaPersonale/users/utenteAutenticato';
import { Elimina } from '../../areaPersonale/review/elimina';
import { GetModal, Patch } from '../../areaPersonale/review/modifica';
import { useNavigate } from 'react-router-dom';
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
                        Per problemi e segnalazioni contattare:
                        <br/>
                        unireview.unitn@gmail.com
                    </Footer>    
                </Layout>
            </Layout>
        </Flex>
        </ConfigProvider>
        );
    }