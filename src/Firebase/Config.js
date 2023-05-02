// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAAEUgXfI3f2Kz_QieNMK48l16oAzCEqTk",
  authDomain: "plantcode-92c31.firebaseapp.com",
  projectId: "plantcode-92c31",
  storageBucket: "plantcode-92c31.appspot.com",
  messagingSenderId: "391224359800",
  appId: "1:391224359800:web:3a27e7a83fceab5f9c268d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth=getAuth(app);
export const storage=getStorage(app);