// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatkaro-5b466.firebaseapp.com",
  projectId: "chatkaro-5b466",
  storageBucket: "chatkaro-5b466.appspot.com",
  messagingSenderId: "1081210402428",
  appId: "1:1081210402428:web:b832efdd918e57ebddbbf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()