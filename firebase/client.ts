// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuqLx6odAyydxhGfmMzGzv8Rym_aFQwlE",
  authDomain: "mockmate-ffd6d.firebaseapp.com",
  projectId: "mockmate-ffd6d",
  storageBucket: "mockmate-ffd6d.firebasestorage.app",
  messagingSenderId: "970513052637",
  appId: "1:970513052637:web:12961cf8f77d80ff753c34",
  measurementId: "G-Z5W0C73L3M"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);