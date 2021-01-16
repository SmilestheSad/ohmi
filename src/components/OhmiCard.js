import React from 'react'
import {Card, Button} from 'antd';



export default function OhmiCard(props) {
    
    return (
        <Card title={props.title} bordered={true} hoverable={true} style={{width: 300, margin: 10}}>
            <p>To: {props.to}</p>
            <p>From: {props.from}</p>
            <p>Description: {props.desc}</p>
            {props.handleClick && <Button onClick = {props.handleClick}>Claim</Button>}
        </Card>
    )
}