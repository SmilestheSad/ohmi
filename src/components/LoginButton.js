import { useAuthState } from 'react-firebase-hooks/auth'
import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import { Button, Modal, Space } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import { sample } from 'lodash'

export default function LoginButton ({ style }) {
  const [user, loading] = useAuthState(firebase.auth())
  const [modalVisible, setModalVisible] = useState(false)
  const db = firebase.firestore()

  const showModal = () => { setModalVisible(true) }
  const closeModal = () => { setModalVisible(false) }

  const createFriendCode = (length, chars) => {
    var result = ''
    for (var i = length; i > 0; --i) result += sample(chars)
    return result
  }

  const signInWithGoogle = async () => {
    const result = await firebase.auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    setModalVisible(false)
    const user = await (db.collection('users').doc(result.user.uid)).get()
    if (user.exists) {
      console.log('exists!')
    } else {
      let friendCode
      do {
        friendCode = createFriendCode(8,
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')
      } while (await db.collection('friendCodes').doc(friendCode).get().exists)
      await db.collection('users')
        .doc(result.user.uid)
        .set({
          name: result.user.displayName,
          photoURL: result.user.photoURL,
          friendCode: friendCode,
        })
      await db.collection('friendCodes')
        .doc(friendCode)
        .set({ userID: result.user.uid })
    }
  }

  const logOut = () => {
    console.log('logging out')
    firebase.auth().signOut().then(result => {
      console.log(result)
    }).catch(error => { console.log(error) })
  }

  useEffect(
    () => {
      console.log(user)
    }, [user],
  )

  return <>
    {user === null ?
      <Button style={style} onClick={showModal}>Log In</Button> :
      <Button style={style} onClick={logOut} loading={loading}>Log Out</Button>
    }
    <Modal
      visible={modalVisible}
      footer={null}
      onCancel={closeModal}
      style={{ textAlign: 'center' }}
    >
      <Space direction={'vertical'}>
        <Button
          loading={loading}
          icon={<GoogleOutlined/>}
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      </Space>
    </Modal>
  </>
}