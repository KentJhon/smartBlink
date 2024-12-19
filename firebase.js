// firebase.js
import { initializeApp } from "firebase/app"; // For Firebase App
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // For Auth
import { getFirestore } from "firebase/firestore"; // For Firestore

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB0z1GDgUVUgQu-fPNXDQKuieopIBz6f44",
  authDomain: "fir-auth-71182.firebaseapp.com",
  projectId: "fir-auth-71182",
  storageBucket: "fir-auth-71182.firebasestorage.app",
  messagingSenderId: "140134860896",
  appId: "1:140134860896:web:9618768e47a0c4a1719b05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword };
