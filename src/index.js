import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import firebase from 'firebase/app'
import { config } from './config/firebase'

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
  console.log('firebase initialized')
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root'),
)