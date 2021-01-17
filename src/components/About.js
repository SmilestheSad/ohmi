import {Layout} from 'antd'
import {Typography} from 'antd'
import {DoubleRightOutlined} from '@ant-design/icons'
const {Header, Content} = Layout;

export default function About () {
  return <div>
    <Layout style = {{textAlign: "center"}}>
      <Layout>
        <Typography.Title style = {{fontSize: "max(15px,4em)", paddingTop: "max(10px, 0.5em)"}}>Hello! Welcome to ohmi!</Typography.Title>
        <Typography.Paragraph style = {{fontSize: "max(20px, 2.5vw)", padding: "1vw 2vw 0 1vw"}}>Have intangible gifts to give? Want to record your current favours? 
          ohmi provides an easy and synchronous way to send and receive favours with friends. Login, add them, and send an ohmi!

        </Typography.Paragraph>
        <DoubleRightOutlined rotate = '90' className = "vert-move" style = {{fontSize: "max(12px,4em)"}}/>
      </Layout>
      <Layout>

      </Layout>
    </Layout>
  </div>
}