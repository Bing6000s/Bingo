// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeQpREnvEJpAIIgglsRO--zlvDzVh6tXg",
  authDomain: "bingo-57821.firebaseapp.com",
  projectId: "bingo-57821",
  storageBucket: "bingo-57821.firebasestorage.app",
  messagingSenderId: "1065660189615",
  appId: "1:1065660189615:web:ecab8b24b6571ad32bbd5a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);