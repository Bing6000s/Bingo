"use client";
import React from "react";
import Link from "next/link"
import BingoMenu from "@/components/BingoMenu"

export default function Homepage() {
  return (
    <div className="flex flex-col h-screen bg-black text-white">
        <title>Bingo - Welcome</title>
      <BingoMenu/>

      {/* Image with Overlay Text */}
      <div className="mt-1 min-h-[500px] relative flex-col flex
       items-center inset-0 justify-center bg-black ">
        <img src="/steam.jpg" 
          alt="Games Image" className=" h-auto w-full max-w-[500px] 
          rounded-lg md:max-w-[1000px] lg:max-w-[900px]" />
          <h1 className="drop-shadow-[2px_2px_10px_rgba(0,0,0,0.8)] absolute top-1/8 font-extrabold text-8xl text-center">Find your next game with ease.</h1>
      </div>

      {/* Main Content */}
      <div className="min-h-[1000px] flex flex-1 flex-col items-center justify-center bg-gradient-to-r from-black via-red-700 to-[#d40000] text-center p-6 ">
        <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-wider text-white">
          we will suggest similar video games based on what you've played before!
        </h1>
        <p className="mt-4 max-w-4xl text-gray-300">
          We analyze the similarity of these video games by finding the common theme across the list you provided. Then, we pick similar themed video games from IMDB to you!
        </p>
        <button className="mt-6 px-8 py-3 bg-red-600 text-white font-bold uppercase rounded-full shadow-lg hover:bg-red-700 hover:scale-105 transition-all">
          <Link href="/signin">Get Started</Link>
        </button>
        <p className="mt-4 max-w-2xl text-gray-300">We also has a separate recommender for online video games!</p>
      </div>



      {/* personal list */}
      <div className="min-h-[1000px] flex flex-1 flex-col items-center justify-center bg-gradient-to-r from-black via-orange-500 to-[#d40000] text-center p-6 ">
        <h1 className="text-5xl font-extrabold uppercase tracking-wider text-white drop-shadow-lg">
        </h1>
        <p className="text-4xl  font-extrabold uppercase tracking-wider mt-4 max-w-2xl text-gray-300">
        Hand picked online video games that I have played in the past. Answer a few questions like how much time you have, how difficult you want the games to be and we'll figure out a great online video game for you.
        </p>
        <p className="text-lg mt-4 max-w-2xl text-gray-300">No sign in required!</p>
        <button className="mt-3 px-8 py-3 bg-white text-black font-bold uppercase rounded-full shadow-lg hover:bg-red-700 hover:scale-105 transition-all">
          <Link href="/binglist">Bing's online game List</Link>
        </button>
      </div>
    </div>
  );
}
