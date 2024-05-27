// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getReactNativePersistence, initializeAuth} from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqGgrlaraDRS8WzoblIN9kse27XD_pvsM",
  authDomain: "kitku-test.firebaseapp.com",
  databaseURL: "https://kitku-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kitku-test",
  storageBucket: "kitku-test.appspot.com",
  messagingSenderId: "8398800678",
  appId: "1:8398800678:web:c1a465d75ca974f85c63e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const userRef = collection (db, 'users');
export const roomRef = collection (db, 'rooms');