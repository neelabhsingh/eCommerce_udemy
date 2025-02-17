// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIGk4qpz6LKwEQ-WMr-RQp3WiNcLiL3WU",
  authDomain: "shoppingecart-fd5c4.firebaseapp.com",
  projectId: "shoppingecart-fd5c4",
  storageBucket: "shoppingecart-fd5c4.firebasestorage.app",
  messagingSenderId: "406575371908",
  appId: "1:406575371908:web:457bb952912019ec9714d1",
  measurementId: "G-8CV2SHXS2V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
