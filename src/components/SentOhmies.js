import { useState, useEffect } from 'react'
import OhmiCard from './OhmiCard'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import { useCollection } from 'react-firebase-hooks/firestore'

export default function SentOhmies () {
  const [user] = useAuthState(firebase.auth())
  const [db] = useCollection(firebase.firestore()
    .collection('ohmies')
    .where('sender', '==', user ? user.uid : 'test_user'),
  )
  const [ohmiData, setOhmiData] = useState([])

  useEffect(() => {
    if (db === null || db === undefined) {
      return
    }
    const newOhmiData = []
    Promise.all(db.docs.map((doc, idx) => {
      const ohmi = {}
      const data = doc.data()
      ohmi.id = doc.id
      ohmi.title = data.title
      ohmi.description = data.description
      const receiverPromise = firebase.firestore()
        .collection('users')
        .doc(data.receiver)
        .get()
        .then((snapshot) => {
          ohmi.receiver = snapshot.get('name')
          ohmi.receiverPhoto=snapshot.get('photoURL')
        })
      const senderPromise = firebase.firestore()
        .collection('users')
        .doc(data.sender)
        .get()
        .then((snapshot) => {
          ohmi.sender = snapshot.get('name')
        })
      return Promise.all([receiverPromise, senderPromise])
        .then(() => {newOhmiData[idx] = ohmi})
    })).then(() => {
      setOhmiData(newOhmiData)
    })
  }, [db])

  return (
    <div>
      <h1>Sent Ohmies</h1>
      {user ?
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {ohmiData.map(ohmi =>
          <OhmiCard
            key={ohmi.id}
            receiver={ohmi.receiver}
            sender={ohmi.sender}
            photo={ohmi.receiverPhoto}
            title={ohmi.title}
            description={ohmi.description}
          />,
        )}
      </div>
      : <h2 style={{ textAlign: 'center' }}>Please log in first to see sent Ohmies!</h2>}
    </div>
  )
}