import { useState, useEffect } from 'react'
import OhmiCard from './OhmiCard'
import { data } from '../testing'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import { useCollection } from 'react-firebase-hooks/firestore'

export default function ReceivedOhmies () {
  const [user] = useAuthState(firebase.auth())
  const [db] = useCollection(firebase.firestore()
    .collection('ohmies')
    .where('receiver', '==',
      firebase.firestore().collection('users').doc(user.uid)),
  )
  useEffect(() => {
    if (db === null || db === undefined) {
      return
    }
    db.forEach((doc) => {
      console.log(doc)
      console.log(doc.data())
      console.log(doc.data().receiver.id)
    })
  }, [db])
  const [ohmiData, setOhmiData] = useState(data)

  const handleClick = (id) => () => {
    setOhmiData(ohmiData.filter(ohmi => ohmi.id !== id))
  }

  return (
    <div>
      <h1>Received Ohmies</h1>
      <div style={{ display: 'flex' }}>
        {ohmiData.map(ohmi =>
          <OhmiCard
            to={ohmi.to}
            from={ohmi.from}
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