
import './App.less';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

require('dotenv').config();


firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: "uomi-6ffa3.firebaseapp.com",
  projectId: "uomi-6ffa3",
  storageBucket: "uomi-6ffa3.appspot.com",
  messagingSenderId: "1008281417322",
  appId: "1:1008281417322:web:f1a99ea98dc47d0de1fc13",
  measurementId: "G-9ZSHHNLGQJ"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
