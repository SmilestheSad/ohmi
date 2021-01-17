import { useState, useEffect } from 'react'
import OhmiCard from './OhmiCard'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import { useCollection } from 'react-firebase-hooks/firestore'

export default function ReceivedOhmies () {
  const [user] = useAuthState(firebase.auth())
  const [db] = useCollection(firebase.firestore()
    .collection('ohmies')
    .where('receiver', '==', user ? user.uid : 'test_user'),
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
          ohmi.senderPhoto=snapshot.get('photoURL')
        })
      return Promise.all([receiverPromise, senderPromise])
        .then(() => {newOhmiData[idx] = ohmi})
    })).then(() => {
      setOhmiData(newOhmiData)
    })
  }, [db])

  const handleClick = (id) => () => {
    firebase.firestore().collection('ohmies').doc(id).delete().then(function() {
        console.log('Document successfully deleted!');
    }).catch(function(error) {
        console.error('Error removing document: ', error);
    });
  }

  return (
    <div>
      <h1>Received Ohmies</h1>
      {user ?
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {ohmiData.map(ohmi =>
          <OhmiCard
            key={ohmi.id}
            receiver={ohmi.receiver}
            sender={ohmi.sender}
            photo={ohmi.senderPhoto}
            title={ohmi.title}
            description={ohmi.description}
            handleClick={handleClick(ohmi.id)}
          />,
        )}
      </div>
      : <h2 style={{ textAlign: 'center' }}>Please log in first to see received Ohmies!</h2>}
    </div>
  )
}