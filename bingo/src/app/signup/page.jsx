'use client'
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/Firebase/config';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-purple-900 to-red-900 text-center p-6">
      <title>Bingo - Sign Up</title>
      <div className="bg-gray-900 p-10 rounded-lg shadow-2xl w-96 border-2 border-red-700">
        <h1 className="text-white text-3xl font-bold mb-5 tracking-wide animate-pulse">Sign Up to Bingo</h1>
       <p className = "text-white font-">Accepting GMail's only</p> 
        <input
          type="email"
          placeholder="Gamer Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-800 rounded text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
        />

        <input
          type="password"
          placeholder="Secret Code"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-800 rounded text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />

        <button
          onClick={handleSignUp}
          className="w-full p-3 bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-700 hover:to-indigo-700 text-white rounded-lg shadow-lg tracking-widest uppercase font-bold transform hover:scale-105 transition duration-300"
        >
        Sign up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
