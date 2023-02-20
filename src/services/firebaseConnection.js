
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDGC2kxd3-Yw0KDk5z6W2efNlDTO2lz4Uc",
  authDomain: "devlinks-lhs.firebaseapp.com",
  projectId: "devlinks-lhs",
  storageBucket: "devlinks-lhs.appspot.com",
  messagingSenderId: "701628425822",
  appId: "1:701628425822:web:e8e49c8fbf79e9f9e6b6cf",
  measurementId: "G-MELX3VLXJX"
};

const fireabaseapp = initializeApp(firebaseConfig)
const db = getFirestore(fireabaseapp)
const auth = getAuth(fireabaseapp)

export { db, auth }