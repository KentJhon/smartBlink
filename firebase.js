// firebase.js
import { initializeApp } from "firebase/app"; // For Firebase App
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // For Auth

// Your Firebase config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword };
