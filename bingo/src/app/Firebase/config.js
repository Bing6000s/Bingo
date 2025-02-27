// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import dotenv from 'dotenv';
dotenv.config()
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY, 
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN, 
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp;
const auth = getAuth(app)
export {app, auth}