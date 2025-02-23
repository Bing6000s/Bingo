// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBeQpREnvEJpAIIgglsRO--zlvDzVh6tXg",
  authDomain: "bingo-57821.firebaseapp.com",
  projectId: "bingo-57821",
  storageBucket: "bingo-57821.firebasestorage.app",
  messagingSenderId: "1065660189615",
  appId: "1:1065660189615:web:ecab8b24b6571ad32bbd5a",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp;
const auth = getAuth(app)
export {app, auth}