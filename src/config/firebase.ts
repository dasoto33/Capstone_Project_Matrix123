// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore" 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBskelPcVJWHvoINZoqipNvXAN2qbEqGp0",
  authDomain: "wonky-concert-app.firebaseapp.com",
  projectId: "wonky-concert-app",
  storageBucket: "wonky-concert-app.appspot.com",
  messagingSenderId: "497152903353",
  appId: "1:497152903353:web:a3bcf69834ba6e44dcb368"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider
export const db = getFirestore(app)