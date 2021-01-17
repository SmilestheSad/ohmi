import { useState } from 'react'
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Input, Button } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'

export default function AddFriend () {
  const [friendCodes, setFriendCodes] = useState('')
  const [submittingCode, setSubmittingCode] = useState(false)
  const [user] = useAuthState(firebase.auth())

  const onFriendCodeAdd = () => {
    if (!user) {
      return //todo: add user message
    }
    const code = friendCodes
    setSubmittingCode(true)
    firebase.firestore()
      .collection('users')
      .doc(user.uid)
      .update({ friends: firebase.firestore.FieldValue.arrayUnion(code) })
      .then(() => setFriendCodes(''))
      .then(() => setSubmittingCode(false))

  }
  return (
    <>
      <Input placeholder="Friend Code" value={friendCodes}
             onChange={(e) => setFriendCodes(e.target.value)}/>
      <Button icon={<UserAddOutlined/>} onClick={onFriendCodeAdd}
              loading={submittingCode}> Add
        Friend </ Button>

    </>
  )
}
