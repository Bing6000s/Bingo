"use client"; // Required for PrimeReact in Next.js App Router

import React from "react";
import Head from "next/head";
import Link from "next/link"
import BingoMenu from "@/components/BingoMenu"

export default function Homepage() {
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Head>
        <title>Bingo - Home</title>
      </Head>
      <BingoMenu/>
      {/* Introduction Section */}
      <div className="flex flex-1 flex-col items-center justify-center text-center p-6 bg-slate-500">
        <p className="text-lg max-w-xl">
          Tell me 3 video games that you really like. Then, we will figure out what your next adventure will be.
        </p>
      </div>

      {/* Image with Overlay Text */}
      <div className="relative flex-col flex items-center">
        <img src="/games.png" alt="Games Image" className="h-auto w-full max-w-[500px] rounded-lg md:max-w-[700px] lg:max-w-[900px]" />
        <div className=" absolute inset-0 flex items-center justify-center bg-grey text-white font-extrabold text-8xl text-center">
          Find your next game with ease.
        </div> 
      </div>

      {/* Main Content */}
      <div className="min-h-[1000px] flex flex-1 flex-col items-center justify-center bg-gradient-to-r from-black via-red-700 to-[#d40000] text-center p-6 ">
        <h1 className="text-5xl font-extrabold uppercase tracking-wider text-white drop-shadow-lg">
          Find Your Next Game Using Bingo!
        </h1>
        <p className="text-lg mt-4 max-w-2xl text-gray-300">
          We analyze your gaming experience and preferences to give you the perfect recommendation. Start here:
        </p>
        <button className="mt-6 px-8 py-3 bg-red-600 text-white font-bold uppercase rounded-full shadow-lg hover:bg-red-700 hover:scale-105 transition-all">
          <Link href="/signin">Get Started</Link>
        </button>
      </div>
    </div>
  );
}
