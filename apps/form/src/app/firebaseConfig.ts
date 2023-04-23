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
  apiKey: "AIzaSyAgyZmNk6H1s59pXlY5R_Kh-Eyf6yp4idQ",
  authDomain: "forms-a704d.firebaseapp.com",
  projectId: "forms-a704d",
  storageBucket: "forms-a704d.appspot.com",
  messagingSenderId: "202517596941",
  appId: "1:202517596941:web:dd2d6a46080b942b7bbe44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const analytics = getAnalytics(app);