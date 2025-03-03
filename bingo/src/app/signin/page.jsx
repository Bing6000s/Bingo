'use client'
import { useState,useEffect} from 'react';
import {useCreateUserWithEmailAndPassword, 
  useSignInWithEmailAndPassword} from 
  'react-firebase-hooks/auth'
import {auth} from '@/app/Firebase/config'
import { useRouter } from 'next/navigation';
import BingoMenu from "@/components/BingoMenu"
import Link from "next/link"

const Authentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, user, loading, error] 
  = useSignInWithEmailAndPassword(auth);
  const router = useRouter()
  const [createUserWithEmailAndPassword] = 
  useCreateUserWithEmailAndPassword(auth);
  useEffect(()=>{
    if(user){
      sessionStorage.setItem("user", JSON.stringify(user.user));
    router.push("/recommend");
  }
},[user,router]);

  const handleSignIn = async () => {
    try {
        const res = await signInWithEmailAndPassword(email, password);
        console.log({res});
        sessionStorage.setItem('user', true)
        setEmail('');
        setPassword('');
        router.push('/')
    }catch(e){
        console.error(e)
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem('user', true);
      setEmail('');
      setPassword('');
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="min-h-screen flex items-center 
    justify-center bg-black">

      <title>
        Bingo - Sign In
      </title>

      <div className='w-full fixed top-0 left-0 bg-black z-10'>
        <BingoMenu/>
      </div>

      <div className='flex flex-grow justify-center items-center
       mt-16'>
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="tracking-wide animate-pulse font-bold text-white text-2xl mb-5">
          SIGN IN
          </h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button 
          onClick={handleSignIn}
          className="w-full p-3 bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-700 hover:to-indigo-700 text-white rounded-lg shadow-lg tracking-widest uppercase font-bold transform hover:scale-105 transition duration-300"
        >
          Sign In
        </button>
        <button 
          onClick={handleSignUp}
          className="w-full p-3 bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-700 hover:to-indigo-700 text-white rounded-lg shadow-lg tracking-widest uppercase font-bold transform hover:scale-105 transition duration-300 mt-1"
        >
          Sign up
        </button>
      </div>
    </div>
    </div>
  );
};

export default Authentication;