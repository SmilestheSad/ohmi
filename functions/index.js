const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const mrOhmiID = 'aPnLgRcpw3ND2HenRGoe'

exports.mrOhmi = functions.firestore.document('ohmies/{ohmiID}')
  .onCreate((snap) => {
    const receiver = snap.get('receiver')
    console.log(snap.get('receiver'))
    if (receiver === mrOhmiID) {
      db.collection('ohmies').add({
        sender: mrOhmiID,
        receiver: snap.get('sender'),
        title: 'Thanks for sending me an ohmi!',
        description: 'I really appreciate it :)',
        timeStamp: admin.firestore.FieldValue.serverTimestamp(),
      })
      db.collection('ohmies').doc(snap.id).delete()
    }
  })