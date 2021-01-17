import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useEffect, useState } from 'react'
import { message } from 'antd'

export default function OhmiesListener (props) {
  const [now] = useState(firebase.firestore.Timestamp.now())
  const [user] = useAuthState(firebase.auth())
  const [db] = useCollection(firebase.firestore()
    .collection('ohmies')
    .where('receiver', '==', user ? user.uid : 'test_user'),
  )
  useEffect(() => {
    if (db === null || db === undefined) {
      return
    }
    db.docChanges().forEach((change) => {
      // We also check for modified because firebase appends the timestamp later
      if ((change.type === 'added' || change.type === 'modified') &&
        change.doc.get('timeStamp') > now) {
        console.log('sent message')
        console.log(change.type)
        message.info(
          {
            content: 'You got a new ohmi!',
            onClick: props.onMessageClicked,
            style: { cursor: 'pointer' },
          })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db])
  return null
}