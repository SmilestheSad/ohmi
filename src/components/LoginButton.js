import { useAuthState } from 'react-firebase-hooks/auth'
import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import { Button, Modal } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'

export default function LoginButton () {
  const [user, loading, error] = useAuthState(firebase.auth())
  const [modalVisible, setModalVisible] = useState(false)
  const showModal = () => {setModalVisible(true)}
  const closeModal = () => {setModalVisible(false)}
  const signInWithGoogle = () => {
    firebase.auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        setModalVisible(false)
      })
  }
  const logOut = () => {
    console.log('logging out')
    firebase.auth().signOut().then(result => {
      console.log(result)
      console.log(user)
    }).catch(error => {console.log(error)})
  }
  useEffect(
    () => {
      console.log(user)
    }, [user],
  )
  return <>
    {user === null ?
      <Button onClick={showModal}>Log In</Button> :
      <Button onClick={logOut} loading={loading}>Log Out</Button>
    }
    <Modal
      visible={modalVisible}
      footer={null}
      onCancel={closeModal}
    >
      <Button
        loading={loading}
        icon={<GoogleOutlined/>}
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </Button>
    </Modal>
  </>
}