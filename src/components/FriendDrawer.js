import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Drawer, Typography } from 'antd'
import { useState, useEffect } from 'react'
import AddFriend from './AddFriend'

export default function FriendDrawer () {
  const [visible, setVisible] = useState(false)
  const [user, loading] = useAuthState(firebase.auth())
  const [friendCode, setFriendCode] = useState(null)

  useEffect(() => {
    if (!user) {
      setFriendCode(null)
      return
    }
    firebase.firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((snapshot) => {
        setFriendCode(snapshot.get('friendCode'))
      })
  }, [user])

  let friendCodeComponent
  if (loading) {
    friendCodeComponent = <LoadingOutlined spin={true}/>
  } else if (user) {
    friendCodeComponent = <Typography.Title level={5}>Friend
      Code: {friendCode}</Typography.Title>
  } else {
    friendCodeComponent = <></>
  }

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
        footer={friendCodeComponent}
        footerStyle={{ textAlign: 'center' }}
      >
        <AddFriend/>
      </Drawer>
    </>
  )
}