import {Divider, Space, Typography, Layout} from "antd";
import {GithubOutlined} from "@ant-design/icons";

const {Footer} = Layout

export default function OhmiFooter() {
    return <Footer style={{textAlign: 'center'}}>
        <Space split={<Divider type={'vertical'}/>}>
            <Typography.Text>Created with React and Ant Design</Typography.Text>
            <Typography.Text>Team VAGA</Typography.Text>
            <Typography.Link href={'https://github.com/SmilestheSad/ohmi'}
                             target={'_blank'}><GithubOutlined/></Typography.Link>
        </Space>
    </Footer>
}