import React from 'react'
import { Card } from 'antd'

export default function OhmiCard(props) {
    return (
        <Card title={props.title} bordered={false} style={{width: 300}}>
            <p>{props.to}</p>
            <p>{props.from}</p>
            <p>{props.desc}</p>
        </Card>
    )
}