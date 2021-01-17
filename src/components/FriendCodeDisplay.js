import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Drawer, Typography } from 'antd'
import { useState, useEffect } from 'react'

export default function FriendCodeDisplay() {
  const [visible, setVisible] = useState(false);
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

  let component
  if (loading) {
    component = <LoadingOutlined spin={true} />
  } else if (user) {
    component = <Typography.Title level={5}
      style={{
        margin: '0px',
        alignSelf: 'center',
      }}>Friend
      Code: {friendCode}</Typography.Title>
  } else {
    component = <></>
  }

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
      >
        <p>map through array of friends</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <div style={{position: 'absolute', bottom: 20}}>
        {component}
        </div>
      </Drawer>
    </>
  );
}