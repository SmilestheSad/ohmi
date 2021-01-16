import './App.less'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import About from './components/About'
import SentOhmies from './components/SentOhmies'
import ReceivedOhmies from './components/ReceivedOhmies'
import CreateOhmi from './components/CreateOhmi'
import OhmiFooter from './components/OhmiFooter'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'uomi-6ffa3.firebaseapp.com',
    projectId: 'uomi-6ffa3',
    storageBucket: 'uomi-6ffa3.appspot.com',
    messagingSenderId: '1008281417322',
    appId: '1:1008281417322:web:f1a99ea98dc47d0de1fc13',
    measurementId: 'G-9ZSHHNLGQJ',
  })
} else {
  firebase.app() // if already initialized, use that one
}

const { Header, Content } = Layout

function App () {
  const [currentTab, setCurrentTab] = useState('1')

  const changeTab = ({ key }) => {
    setCurrentTab(key)
  }

  const pages = [
    { pageName: 'About', component: About },
    { pageName: 'Sent Ohmies', component: SentOhmies },
    { pageName: 'Received Ohmies', component: ReceivedOhmies },
    { pageName: 'Create an Ohmi', component: CreateOhmi },
  ]

  return (
    <div className="App">
      <Router>
        <Layout>
          <Header>
            <div className="logo"/>
            <Menu onClick={changeTab}
                  selectedKeys={[currentTab]}
                  theme="dark" mode="horizontal">
              {pages.map(
                (val, idx) =>
                  <Menu.Item key={idx}>{val.pageName}</Menu.Item>)
              }
            </Menu>
          </Header>
          <Content
            style={{ padding: '0 50px', marginTop: 64 }}>
            <div
              style={{ padding: 24, minHeight: 380 }}>
              <Route path="" component={pages[currentTab].component}/>
            </div>
          </Content>
          <OhmiFooter/>
        </Layout>
      </Router>
    </div>
  )
}

export default App
