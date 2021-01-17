import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Avatar, List } from 'antd'
import { useState, useEffect } from 'react'

export default function FriendList () {
  const [user] = useAuthState(firebase.auth())
  const [userDoc] = useCollection(firebase.firestore()
    .collection('users')
    .doc(user ? user.uid : 'test_user'))
  const [friendCodes, setFriendCodes] = useState(['invalid'])
  const [friendsDB] = useCollection(firebase.firestore()
    .collection('users')
    .where('friendCode', 'in', friendCodes),
  )
  const [friends, setFriends] = useState([])

  useEffect(() => {
      if (userDoc === null || userDoc === undefined || !userDoc.exists) {
        setFriendCodes(['invalid'])
        return
      }
      setFriendCodes(userDoc.data().friends.length === 0 ? ['none'] :
        userDoc.data().friends)
    }
    , [userDoc])

  useEffect(() => {
    if (friendsDB === null || friendsDB === undefined) {
      return
    }
    setFriends(
      friendsDB.docs.map(doc => ({ id: doc.id, data: doc.data() })))
  }, [friendsDB])
  return (<>
    <List
      dataSource={friends}
      rowKey={({ id }) => id}
      header={'Friends'}
      renderItem={(item) => {
        return (<>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar
                src={item.data.photoURL}
              />}
              title={item.data.name}
            />
          </List.Item>
        </>)
      }}
    >

    </List>
  </>)
}