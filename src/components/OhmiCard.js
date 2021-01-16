import React, { Component } from 'react'
import {Card} from 'antd';

export default function OhmiCard(props){
    return(
        <Card title="Card title" bordered={false} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </Card>
    )
}