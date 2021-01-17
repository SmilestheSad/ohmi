import './App.less'
import { useState } from 'react'
import { Layout, Menu, Space } from 'antd'

import About from './components/About'
import LoginButton from './components/LoginButton'
import SentOhmies from './components/SentOhmies'
import ReceivedOhmies from './components/ReceivedOhmies'
import CreateOhmi from './components/CreateOhmi'
import OhmiFooter from './components/OhmiFooter'
import FriendDrawer from './components/FriendDrawer'
import OhmiesListener from './components/ReceivedOhmiesListener'
import OhmiParticleBg from './components/OhmiParticleBg'
import OhmiAvatar from './components/OhmiAvatar'

const { Header, Content } = Layout

function App () {
  const [currentTab, setCurrentTab] = useState('0')

  const changeTab = ({ key }) => {
    if (!key || key >= pages.length) {
      return
    }
    setCurrentTab(key)
  }

  const pages = [
    { pageName: 'About', component: <About/> },
    { pageName: 'Sent ohmies', component: <SentOhmies/> },
    { pageName: 'Received ohmies', component: <ReceivedOhmies/> },
    { pageName: 'Create an ohmi', component: <CreateOhmi/> },
  ]

  const receivedIndex = pages.findIndex(
    ({ component }) => component.type === ReceivedOhmies)
  const changeToReceivedOhmies = () => setCurrentTab(receivedIndex)

  return (
    <>
      <Layout>
        <Header>
          <div className='logo'/>
          <Menu onClick={changeTab}
                selectedKeys={[currentTab]}
                theme='dark' mode='horizontal'
          >
            {pages.map(
              (val, idx) =>
                <Menu.Item key={idx}>{val.pageName}</Menu.Item>)
            }
            <Space style={{ float: 'right' }}>
              <FriendDrawer/>
              <OhmiAvatar/>
              <LoginButton style={{ alignSelf: 'center' }}/>
            </Space>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: '30px' }}>
          <div
            style={{ minHeight: '75vh' }}>
            {pages[currentTab].component}
          </div>
        </Content>
        <OhmiFooter/>
        <OhmiesListener onMessageClicked={changeToReceivedOhmies}/>
      </Layout>
      <OhmiParticleBg/>
    </>
  )
}

export default App
