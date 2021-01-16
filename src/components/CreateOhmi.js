import { Form, Input, Button } from 'antd'
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const layout = {
  labelCol: {
    span: 7,
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
  const [user] = useAuthState(firebase.auth())
  const [form] = Form.useForm()

  const onFinish = (values) => {
    if (!user) {
      return
    }
    console.log(
      `to: ${values.cardReceiver} from: ${user.uid} title: ${values.cardTitle} desc: ${values.cardDesc}`)
    firebase.firestore().collection('ohmies')
      .add({
        sender: `users/${user.uid}`,
        receiver: `users/${values.cardReceiver}`,
        title: values.cardTitle,
        description: values.cardDesc,
      })

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
      <Form justify="center" {...layout} form={form} name="control-hooks"
            onFinish={onFinish}>
        <Form.Item
          name="cardReceiver"
          label="To"
          rules={[{ required: true }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="cardTitle"
          label="Title"
          rules={[{ required: true }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="cardDesc"
          label="Description"
          rules={[{ required: true }]}
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
