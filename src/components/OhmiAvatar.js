import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Tooltip } from 'antd'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase'
import { useState, useEffect } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'

export default function OhmiAvatar () {
  const [user, loading] = useAuthState(firebase.auth())
  const [userDoc] = useDocument(
    firebase.firestore().collection('users').doc(user ? user.uid : 'test_user'))
  const [photoURL, setPhotoURL] = useState(null)
  const [name, setName] = useState('')
  useEffect(() => {
    if (!userDoc || !userDoc.exists) {
      setPhotoURL(null)
      setName('')
      return
    }
    setPhotoURL(userDoc.get('photoURL'))
    setName(userDoc.get('name'))
  }, [userDoc])
  let component
  if (loading) {
    component = <LoadingOutlined spin={true}/>
  } else if (user) {
    component = <Tooltip title={`Logged in as ${name}`}>
      <Avatar src={photoURL}
              style={{ alignSelf: 'center' }}/>
    </Tooltip>
  } else {
    component = <Avatar style={{ alignSelf: 'center' }} icon={<UserOutlined/>}/>
  }
  return component

}