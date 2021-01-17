<<<<<<< HEAD
import { Layout, Typography, Anchor, Space } from 'antd'
import { DoubleRightOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd';
=======
import { Layout } from 'antd'
import { Typography } from 'antd'
import { DoubleRightOutlined } from '@ant-design/icons'
>>>>>>> b68ce851b15708b98d597753ee37a0c2e1838780

const rowSpacing = {
  paddingBottom: "calc(20px + 3vw)"
}

const instruction = {
  fontSize: "max(15px, 2vw)"
}
export default function About() {
  return <div>
    <Layout style={{ textAlign: "center"}}>
      <Layout style = {{paddingBottom: "calc(6em + 30px)"}}>
        <Typography.Title style={{ fontSize: "max(15px,4em)", paddingTop: "max(10px, 0.5em)" }}>Hello! Welcome to ohmi!</Typography.Title>
        <Typography.Paragraph style={{ fontSize: "max(20px, 2.5vw)", padding: "1vw 2vw 0 1vw" }}>Have intangible gifts to give? Want to record your current favours?
        ohmi provides an easy and synchronous way to send and receive favours with friends. Login and add them to send and receive ohmies!

        </Typography.Paragraph>
        <Space style = {{justifyContent: "center"}}><a href = "#tutorial"><DoubleRightOutlined rotate='90' className="vert-move" style={{ fontSize: "max(12px,4em)", paddingTop: "2vw" }} /></a></Space>
      </Layout>
      <Layout>
      <div id = "tutorial">
        <Row style = {rowSpacing}>
          <Col span={6} offset = {4} >
            <Typography.Text style = {instruction}>
              Step 1: Literally log in <br/>
              All you have to do is log in please just do it 
            </Typography.Text>
          </Col>
          <Col span={11}>Here is hot video</Col>
        </Row>
        <Row style = {rowSpacing}>
          <Col span={6} offset = {4}>
            <Typography.Text style = {instruction}>
              Step 2: Add your friends <br/>
              Really just use the friend code it is right there unless you dont have friends :(
            </Typography.Text>
          </Col>
          <Col span={11}>Here is hot video</Col>
        </Row>
        <Row style = {rowSpacing}>
          <Col span={6} offset = {4}>
            <Typography.Text style = {instruction}>
              Step 3: Send the ohmies <br />
              You send them favours. Could be whatever you want. As long as you are happy. :)
            </Typography.Text>
          </Col>
          <Col span={11}>Here is hot video</Col>
        </Row>
      </div>
      </Layout>
    </Layout>
  </div>
}