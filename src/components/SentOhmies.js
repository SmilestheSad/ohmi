import { useState } from 'react'
import OhmiCard from './OhmiCard'
import { data } from '../testing'
import firebase from './firebase.js'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';


export default function SentOhmies() {
  const [user, userLoading, userError] = useAuthState(firebase.auth())

  const [db, dbLoading, dbError] = useCollection(
    user && firebase.firestore().collection('ohmies').where('sender', '==', user.uid)
  )

  console.log(user)
  console.log(db)

  return (
    <div>
      <h1>Sent Ohmies</h1>
      <div style={{ display: 'flex' }}>
        {db && db.map(ohmi =>
          <OhmiCard
            to={ohmi.to}
            from={ohmi.from}
            title={ohmi.title}
            desc={ohmi.desc}
          />
        )}
      </div>
    </div>
  )
}