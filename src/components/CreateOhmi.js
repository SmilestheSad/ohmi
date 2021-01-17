import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Select } from 'antd'
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

const { Option } = Select
const { TextArea } = Input

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
    offset: 11,
    span: 10,
  },
}

export default function CreateOhmi () {
  const [user] = useAuthState(firebase.auth())
  const [userDoc] = useCollection(firebase.firestore()
    .collection('users')
    .doc(user ? user.uid : 'test_user'))
  const [friendCodes, setFriendCodes] = useState(['invalid'])
  const [friendsDB] = useCollection(firebase.firestore()
    .collection('users')
    .where('friendCode', 'in', friendCodes),
  )

  const [form] = Form.useForm()

  const [users, setUsers] = useState([])

  useEffect(() => {
      if (userDoc === null || userDoc === undefined) {
        return
      }
      setFriendCodes(userDoc.data().friends)
    }
    , [userDoc])

  useEffect(() => {
    if (friendsDB === null || friendsDB === undefined) {
      return
    }
    setUsers(friendsDB.docs.map(doc => ({ id: doc.id, data: doc.data() })))
  }, [friendsDB])

  const onFinish = (values) => {
    if (user) {
      console.log(
        `to: ${values.cardReceiver} from: ${user.uid} title: ${values.cardTitle} desc: ${values.cardDesc}`)
      firebase.firestore().collection('ohmies')
        .add({
          sender: user.uid,
          receiver: values.cardReceiver,
          title: values.cardTitle,
          description: values.cardDesc,
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
    } else {
      alert(
        'Wow. Nothing Happened. I wonder why. Maybe you should log in first.')
    }
    form.resetFields()
  }

  const onReset = () => {
    form.resetFields()
  }

  return (<>
      <div style={{ padding: '30px' }}>
        <h2 style={{ textAlign: 'center' }}>{user
          ? 'Create an Ohmi'
          : 'Please log in first to send an Ohmi!'}</h2>
        <br/>
        <Form justify='center' {...layout} form={form} name='control-hooks'
              onFinish={onFinish}>
          <Form.Item
            name='cardReceiver'
            label='To'
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder='Select a user to send an Ohmi to'
              filterOption={(input, option) => {
                return option.children.toLowerCase()
                  .includes(input.toLowerCase())
              }}
            >
              {users.map(user => (
                <Option key={user.id} value={user.id}>{user.data.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name='cardTitle'
            label='Title'
            rules={[{ required: true }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name='cardDesc'
            label='Description'
            rules={[{ required: true }]}
          >
            <TextArea rows={4}/>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Button htmlType='button' onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
};
