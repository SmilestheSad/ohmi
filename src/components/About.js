import { Layout, Typography, Space, List } from 'antd'
import { DoubleRightOutlined } from '@ant-design/icons'
import ReactPlayer from 'react-player'

export default function About () {
  const instructions = [
    {
      title: 'Step 1: Log in',
      link: 'https://www.youtube.com/watch?v=T9nBHHXwpBc',
    },
    {
      title: 'Step 2: Add your friends and give them the friend code with the friend list',
      link: 'https://www.youtube.com/watch?v=DB7pc1775R4',
    },
    {
      title: 'Step 3: Send the ohmies. You send them favours. Anything you want. As long as you\'re happy. :)',
      link: 'https://www.youtube.com/watch?v=uFAoNjnB6no',
    },
    {
      title: 'Step 4: Receive ohmies from your friends. Never forget again.',
      link: 'https://www.youtube.com/watch?v=27sf92dCjEY',
    },
  ]
  return <div>
    <Layout style={{ textAlign: 'center' }}>
      <Layout style={{
        paddingBottom: 'calc(6em + 30px)',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div>
          <Typography.Title
            style={{
              fontSize: 'max(15px,4em)',
              paddingTop: 'max(10px, 0.5em)',
            }}>ohmi: favours redefined</Typography.Title>
          <Space style={{ justifyContent: 'center' }}><a
            href={'#tutorial'}><DoubleRightOutlined rotate='90'
                                                    className="vert-move"
                                                    style={{
                                                      fontSize: 'max(12px,4em)',
                                                      paddingTop: '2vw',
                                                    }}/></a></Space>
        </div>
      </Layout>
      <Layout>
        <div id="tutorial" style={{ margin: '0 10vw' }}>
          <List
            dataSource={instructions}
            renderItem={(item) => {
              return <List.Item>
                <List.Item.Meta style={{ width: '40%', padding: '2vh 5vw' }}
                                title={
                                  <Typography.Title>{item.title}</Typography.Title>}
                />
                <ReactPlayer url={item.link} width='30%'
                             style={{ marginRight: '5vw' }}/>
              </List.Item>
            }}
          >
          </List>
        </div>
      </Layout>
    </Layout>
  </div>
}