import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Drawer, Typography } from 'antd'
import { useState, useEffect } from 'react'
import AddFriend from './AddFriend'
import FriendCode from './FriendCode'
export default function FriendDrawer () {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button type='primary' onClick={() => setVisible(true)}>
        Friend List
      </Button>
      <Drawer
        title='Friend List'
        placement='right'
        onClose={() => setVisible(false)}
        visible={visible}
        footer= {<FriendCode/>}
        footerStyle={{ textAlign: 'center' }}
      >
        <AddFriend/>
      </Drawer>
    </>
  )
}