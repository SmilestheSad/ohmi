import { useState, useEffect } from 'react'
import firebase from 'firebase/app'

export default function About () {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection('users').get()
      setUsers(data.docs.map(doc => doc.data()))
    }
    fetchData()
  }, [])
  return (
    <div>
      <h1>explanation here about what ohmi is</h1>
      {users.map(user => (
        <li key={user.name}>{user.name}</li>
      ))}
    </div>
  )
}