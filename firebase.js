import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";      


const firebaseConfig = {
  apiKey: "AIzaSyDUwC6K6zkKYX9Rtd0qEuoEdrKkCIKi-II",
  authDomain: "devdeakin-login-6c90e.firebaseapp.com",
  projectId: "devdeakin-login-6c90e",
  storageBucket: "devdeakin-login-6c90e.firebasestorage.app",
  messagingSenderId: "9370720962",
  appId: "1:9370720962:web:841b1ff20a13864a19f95b",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
