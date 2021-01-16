import './App.less'
import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'

import About from './components/About'
import SentOhmies from './components/SentOhmies'
import ReceivedOhmies from './components/ReceivedOhmies'
import CreateOhmi from './components/CreateOhmi'
import OhmiFooter from './components/OhmiFooter'

const { Header, Content } = Layout

function App () {
  const [currentTab, setCurrentTab] = useState('0')

  const changeTab = ({ key }) => {
    setCurrentTab(key)
  }

  const pages = [
    { pageName: 'About', component: <About/> },
    { pageName: 'Sent Ohmies', component: <SentOhmies/> },
    { pageName: 'Received Ohmies', component: <ReceivedOhmies/> },
    { pageName: 'Create an Ohmi', component: <CreateOhmi/> },
  ]

  return (
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
          {pages[currentTab].component}
        </div>
      </Content>
      <OhmiFooter/>
    </Layout>
  )
}

export default App
