import { useState, useEffect } from 'react'
import OhmiCard from './OhmiCard'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import { useCollection } from 'react-firebase-hooks/firestore'

export default function ReceivedOhmies () {
  const [user] = useAuthState(firebase.auth())
  const [db] = useCollection(firebase.firestore()
    .collection('ohmies')
    .where('receiver', '==', user.uid),
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

  const handleClick = (id) => () => {
    setOhmiData(ohmiData.filter(ohmi => ohmi.id !== id))
  }

  return (
    <div>
      <h1>Received Ohmies</h1>
      <div style={{ display: 'flex' }}>
        {ohmiData.map(ohmi =>
          <OhmiCard
            key={ohmi.id}
            to={ohmi.receiver}
            from={ohmi.sender}
            title={ohmi.title}
            desc={ohmi.desc}
            handleClick={handleClick(ohmi.id)}
          />,
        )}
      </div>
      {db && db.forEach((doc) => {
        return doc.data().title
      })}
    </div>
  )
}