'use client'
import { useState,useEffect} from 'react';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/Firebase/config'
import { useRouter } from 'next/navigation';
import BingoMenu from "@/components/BingoMenu"
import Link from "next/link"

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter()

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <title>
        Bingo - Sign In
      </title>

      <div className='w-full fixed top-0 left-0 bg-black z-10'>
        <BingoMenu/>
      </div>

      <div className='flex flex-grow justify-center items-center mt-16'>
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>
        <p className='text-white font-thin'>Accepting GMail's only.</p>
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
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign In
        </button>
        <button 
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          <Link href="/signup">
          Sign up
          </Link>
        </button>
      </div>
    </div>
    </div>
  );
};

export default SignIn;