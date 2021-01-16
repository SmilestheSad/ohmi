import React, {useState} from 'react'
import LoginButton from './LoginButton'
import firebase from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

export default function About () {
  const [users, setUsers] = useState([])
  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("users").get()
      setUsers(data.docs.map(doc => doc.data()));
    }
    fetchData()
  }, [])
  return (
    <div>
      <h1>explanation here about what ohmi is</h1>
        {users.map(user => (
          <li id = {user.five}>{user.five}</li>
        ))}
      <LoginButton/>
    </div>
  )
}