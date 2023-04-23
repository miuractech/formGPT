// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpOgURvG9_99XgyE12cl92JhWWwt-q9zs",
  authDomain: "stoic-cabd0.firebaseapp.com",
  projectId: "stoic-cabd0",
  storageBucket: "stoic-cabd0.appspot.com",
  messagingSenderId: "226844148244",
  appId: "1:226844148244:web:e42414342e26fdd3bb9d01",
  measurementId: "G-PF0KQL1S2W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const analytics = getAnalytics(app);