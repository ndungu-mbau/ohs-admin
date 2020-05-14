import * as firebase from "firebase/app"
import "firebase/messaging"

const initializedFirebaseApp = firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyCrF-z70YFpI7KxCu5UoiFy27HcsDizXIg",
  authDomain: "adrian-ohs-system.firebaseapp.com",
  databaseURL: "https://adrian-ohs-system.firebaseio.com",
  projectId: "adrian-ohs-system",
  storageBucket: "adrian-ohs-system.appspot.com",
  messagingSenderId: "836214996982",
  appId: "1:836214996982:web:0ae37d6e2d0e5017cf91d7",
  measurementId: "G-3BHR914T9C"
})

const messaging = initializedFirebaseApp.messaging()
messaging.usePublicVapidKey(
	// Project Settings => Cloud Messaging => Web Push certificates
  "BDYQBeY9wopUQJBaqQOWpk_RSV87dEFGy4JyNv6hyQ7_MXnuuXjtoVEA6ve_bWEQ7pDcCyfshklEND2z2mSsXhE"
)

export { messaging }