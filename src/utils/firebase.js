import firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyCAl-HPBvIxz7C-H2n6Zsw5-9aoIT156Oc",
  authDomain: "health-manage-65769.firebaseapp.com",
  databaseURL: "https://health-manage-65769.firebaseio.com",
  projectId: "health-manage-65769",
  storageBucket: "health-manage-65769.appspot.com",
  messagingSenderId: "842718418506",
  appId: "1:842718418506:web:eae52a1a8dde4bbfef78b3"
})

const auth = firebase.auth()
const db = firebase.firestore()
db.settings({})

export { auth, db }
