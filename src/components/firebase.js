import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'uomi-6ffa3.firebaseapp.com',
  projectId: 'uomi-6ffa3',
  storageBucket: 'uomi-6ffa3.appspot.com',
  messagingSenderId: '1008281417322',
  appId: '1:1008281417322:web:f1a99ea98dc47d0de1fc13',
  measurementId: 'G-9ZSHHNLGQJ',
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
  console.log('firebase initialized')
}

export default firebase