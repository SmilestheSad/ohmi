import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase'
import { useState, useEffect } from 'react'

export default function OhmiAvatar () {
  const [user, loading] = useAuthState(firebase.auth())
  const [photoURL, setPhotoURL] = useState(null)
  useEffect(() => {
    if (!user) {
      setPhotoURL(null)
      return
    }
    firebase.firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((snapshot) => {
        setPhotoURL(snapshot.get('photoURL'))
      })
  }, [user])
  let component
  if (loading) {
    component = <LoadingOutlined spin={true}/>
  } else if (user) {
    component = <Avatar src={photoURL} style={{ alignSelf: 'center' }}/>
  } else {
    component = <Avatar style={{ alignSelf: 'center' }} icon={<UserOutlined/>}/>
  }
  return component

}