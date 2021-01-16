import './App.less'
import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {Layout, Menu} from 'antd'

import About from './components/About'
import CreateOhmi from './components/CreateOhmi'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import OhmiFooter from "./components/OhmiFooter";

if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: "uomi-6ffa3.firebaseapp.com",
      projectId: "uomi-6ffa3",
      storageBucket: "uomi-6ffa3.appspot.com",
      messagingSenderId: "1008281417322",
      appId: "1:1008281417322:web:f1a99ea98dc47d0de1fc13",
      measurementId: "G-9ZSHHNLGQJ"});
  }else {
    firebase.app(); // if already initialized, use that one
  }


const { Header, Content, Footer } = Layout;

function App() {
  const [currentTab, setCurrentTab] = useState("1")

  const handleClick = (e) => {
    setCurrentTab(e.key)
  }

  return (
    <div className="App">
      <Router>
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu onClick={handleClick}
            selectedKeys={[currentTab]}
            theme="dark" mode="horizontal">
              <Menu.Item key="1">Home<Link to="" /></Menu.Item>
              <Menu.Item key="2">Sent Ohmies<Link to="/CreateOhmi" /></Menu.Item>
              <Menu.Item key="3">Received Ohmies</Menu.Item>
              <Menu.Item key="4">Create an Ohmi</Menu.Item>
            </Menu>
          </Header>
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
              {currentTab === "1" ? <Route path="" component={About} /> : null}
              {currentTab === "2" ? <Route path="" component={CreateOhmi} /> : null}
            </div>
          </Content>
          <OhmiFooter/>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
