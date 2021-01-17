import { Card, Button, Avatar, Tooltip } from 'antd'

const { Meta } = Card

export default function OhmiCard(props) {

  return (
    <Card bordered={true} hoverable={true} style={{ width: 300, margin: 10 }}
      actions={props.handleClick &&
        [
          <Button onClick={props.handleClick}>Claim</Button>,
        ]}
    >

      <Meta
        avatar={
          <Tooltip title={props.isSent ? `Sent to ${props.receiver}` : `Received from ${props.sender}`}>
            <Avatar
              src={props.photo ??
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />
          </Tooltip>
        }
        title={props.title}
        description={props.description}
      />
    </Card>
  )
}