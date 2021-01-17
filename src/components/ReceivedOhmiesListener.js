import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useEffect, useState } from 'react'
import { message } from 'antd'

export default function OhmiesListener () {
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
    console.log(db.docChanges)
    db.docChanges().forEach((change) => {
      // We also check for modified because firebase appends the timestamp later
      if ((change.type === 'added' || change.type === 'modified') &&
        change.doc.get('timeStamp') > now) {
        message.info('You got a new ohmi!')
      }
    })
  }, [db, now])
  return null
}