import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Tooltip } from 'antd'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase'
import { useState, useEffect } from 'react'

export default function OhmiAvatar () {
  const [user, loading] = useAuthState(firebase.auth())
  const [photoURL, setPhotoURL] = useState(null)
  const [name, setName] = useState('')
  useEffect(() => {
    if (!user) {
      setPhotoURL(null)
      setName('')
      return
    }
    firebase.firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((snapshot) => {
        setPhotoURL(snapshot.get('photoURL'))
        setName(snapshot.get('name'))
      })
  }, [user])
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