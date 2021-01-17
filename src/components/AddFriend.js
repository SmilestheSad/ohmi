import { useState } from 'react'
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Input, Button, Modal, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'

export default function AddFriend () {
  const [friendCodes, setFriendCodes] = useState('')
  const [submittingCode, setSubmittingCode] = useState(false)
  const [user] = useAuthState(firebase.auth())

  const onFriendCodeAdd = async () => {
    if (!user) {
      Modal.error({ content: 'Please log in first!' })
      return //todo: add user message
    }
    if (!friendCodes) {
      message.error('Please enter a friend code!')
      return
    }
    const code = friendCodes.toUpperCase()
    setSubmittingCode(true)
    const friendCodeDoc = await firebase.firestore()
      .collection('friendCodes')
      .doc(code)
      .get()
    if (!friendCodeDoc.exists) {
      setSubmittingCode(false)
      Modal.error({
        content:
          'The friend you have entered does not exist. Please make sure your friend code is correct!',
      })
      return
    }
    await firebase.firestore()
      .collection('users')
      .doc(user.uid)
      .update({ friends: firebase.firestore.FieldValue.arrayUnion(code) })

    Modal.success({ content: 'Your friend was added!' })
    setFriendCodes('')
    setSubmittingCode(false)
  }
  return (
    <>
      <Input placeholder="Friend Code" value={friendCodes}
             onChange={(e) => setFriendCodes(e.target.value)}
             suffix={<Button icon={<UserAddOutlined/>} onClick={onFriendCodeAdd}
                             loading={submittingCode}/>}
      />


    </>
  )
}
