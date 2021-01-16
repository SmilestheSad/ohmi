import './App.less'
import {Layout, Menu, Breadcrumb} from 'antd'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "uomi-6ffa3.firebaseapp.com",
    projectId: "uomi-6ffa3",
    storageBucket: "uomi-6ffa3.appspot.com",
    messagingSenderId: "1008281417322",
    appId: "1:1008281417322:web:f1a99ea98dc47d0de1fc13",
    measurementId: "G-9ZSHHNLGQJ"
})

const {Header, Content, Footer} = Layout;

function App() {
    return (
        <div className="App">
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 380}}>
                        Content
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </div>
    );
}

export default App;
