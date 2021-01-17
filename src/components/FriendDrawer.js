
import { Button, Drawer,} from 'antd'
import { useState } from 'react'
import AddFriend from './AddFriend'
import FriendCode from './FriendCode'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase'
export default function FriendDrawer () {
  const [visible, setVisible] = useState(false)
  const [user, loading] = useAuthState(firebase.auth())
  return (
    user &&
    <>
      <Button loading={loading} onClick={() => setVisible(true)}>
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

