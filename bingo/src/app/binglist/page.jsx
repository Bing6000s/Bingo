"use client";
import { useState } from "react";

export default function GamePreferencePage() {
  const [difficulty, setDifficulty] = useState(2);
  const [playTime, setPlayTime] = useState(30);

  const difficultyLevels = ["Relaxing", "Normal", "Competitive", "Insanely Hard"];

  return (
    <div>
    <title>Bing's list</title>
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold uppercase mb-8">Game Preferences</h1>

      {/*DIFFICULTY*/}
      <div className="w-full max-w-lg mb-6">
        <h2 className="text-xl font-bold">Difficulty: <span className="text-red-400">{difficultyLevels[difficulty]}</span></h2>
        <input 
          type="range" 
          min="0" 
          max="4" 
          value={difficulty} 
          onChange={(e) => setDifficulty(Number(e.target.value))}
          className="w-full mt-2 cursor-pointer accent-red-500"
        />
      </div>

      {/*PLAY TIME*/}
      <div className="w-full max-w-lg mb-6">
        <h2 className="text-xl font-bold">Playing Time: <span className="text-blue-400">{playTime} mins</span></h2>
        <input 
          type="range" 
          min="30" 
          max="100" 
          step="10"
          value={playTime} 
          onChange={(e) => setPlayTime(Number(e.target.value))}
          className="w-full mt-2 cursor-pointer accent-blue-500"
        />
      </div>


      
      {/*SUGGEST*/}
      <button className="mt-6 px-6 py-3 bg-red-600 text-white font-bold uppercase rounded-lg shadow-lg hover:bg-red-700 transition-all">
        SUGGEST ME A GAME!
      </button>
    </div>
    </div>
  );
}
