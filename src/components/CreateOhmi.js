import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'

const layout = { 
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 10,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 16,
  },
}

export default function CreateOhmi () {
  const [cardTo, setTo] = useState('')
  const [cardFrom, setFrom] = useState('')
  const [cardTitle, setCardTitle] = useState('')
  const [cardDesc, setCardDesc] = useState('')
  const [form] = Form.useForm()

  const onFinish = (values) => {
    setTo(values.cardTo)
    setFrom(values.cardFrom)
    setCardTitle(values.cardTitle)
    setCardDesc(values.cardDesc)
    console.log(
      `to: ${cardTo} from: ${cardFrom} title: ${cardTitle} desc: ${cardDesc}`)
    form.resetFields()
  }

  const onReset = () => {
    form.resetFields()
  }

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    })
  }

  return (
    <div>
      <Form justify="center" {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="cardTo"
          label="To"
          rules={[{required: true}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="cardFrom"
          label="From"
          rules={[{required: true}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="cardTitle"
          label="Title"
          rules={[{required: true}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="cardDesc"
          label="Description"
          rules={[{required: true}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
};
