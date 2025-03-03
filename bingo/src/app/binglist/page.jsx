'use client';
import { useState, useEffect } from "react";
import BingoMenu from "@/components/BingoMenu";
/**
 * The goal is to push everybody to play Apex Legends and Valorant, 
 * so they are placed at where people most likely put the slider on.
 */
const GAME_RECOMMENDATIONS = {
  "less than 30 minutes": {
    relaxing: "Fall Guys",
    competitive: "Marvel Rivals",
    insane: "Apex Legends",
  },
  "around 1 hour": {
    relaxing: "Rocket League",
    competitive: "Rainbow Six Siege",
    insane: "Valorant",
  },
  "1 hour or more": {
    relaxing: "Minecraft",
    competitive: "Dota 2",
    insane: "League of Legends",
  },
};

/**
 * 
 * @returns Two api calls. One to get the rating, game picture, 
 * and game stats including the average play time, popularity score
 * and number of ratings.
 */
export default function GameSelector() {
  const [playtime, setPlaytime] = useState("less than 30 minutes");
  const [difficulty, setDifficulty] = useState("insane");
  const [game, setGame] = useState("Apex Legends");
  const [gameDetails, setGameDetails] = useState(null);
  const [gameStats, setGameStats] = useState(null);

  const API_KEY = process.env.NEXT_PUBLIC_RAWG_APIKEY;

  useEffect(() => {
    const selectedGame = GAME_RECOMMENDATIONS[playtime][difficulty];
    setGame(selectedGame);
    fetchGameDetails(selectedGame);
  }, [playtime, difficulty]);

  const fetchGameDetails = async (gameName) => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?search=${encodeURIComponent(gameName)}&key=${API_KEY}`
      );
      const data = await response.json();
      const gameInfo = data.results?.[0] || null;
      setGameDetails(gameInfo);

      if (gameInfo) {
        fetchGameStats(gameInfo.id);
      } else {
        setGameStats(null);
      }
    } catch (error) {
      console.error("Error fetching game details:", error);
      setGameDetails(null);
      setGameStats(null);
    }
  };

  const fetchGameStats = async (gameId) => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`
      );
      const data = await response.json();
      setGameStats(data);
    } catch (error) {
      console.error("Error fetching game stats:", error);
      setGameStats(null);
    }
  };

  return (
    <>
      <title>Bingo - Online Game Recommendation</title>

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">

      

      <div className='w-full fixed top-0 left-0 bg-black z-10'>
        <BingoMenu />
      </div>

      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-96">
        <h1 className="text-xl font-bold text-center mb-6">Online Game Recommendation</h1>

        {/* Playtime Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">How much time do you want to play?</h2>
          <div className="flex gap-2">
            {Object.keys(GAME_RECOMMENDATIONS).map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition 
                  ${playtime === option ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600"}`}
                onClick={() => setPlaytime(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Select Difficulty</h2>
          <div className="flex gap-2">
            {Object.keys(GAME_RECOMMENDATIONS[playtime]).map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition 
                  ${difficulty === option ? "bg-red-600 text-white" : "bg-gray-700 hover:bg-gray-600"}`}
                onClick={() => setDifficulty(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Game Details */}
        <div className="mt-6 p-4 bg-gray-700 rounded-xl text-center">
          <h2 className="text-lg font-bold">{game}</h2>
          {gameDetails ? (
            <div className="mt-4">
              <img
                src={gameDetails.background_image}
                alt={game}
                className="rounded-lg shadow-lg w-full"
              />
              <p className="mt-2 text-sm">Rating: {gameDetails.rating} ⭐</p>
            </div>
          ) : (
            <p className="text-sm">Loading game details...</p>
          )}
        </div>

        {/* Game Statistics */}
        {gameStats && (
          <div className="mt-6 p-4 bg-gray-700 rounded-xl text-center">
            <h2 className="text-lg font-bold">Game Stats</h2>
            <p className="text-sm mt-2">
              <strong>Average Playtime:</strong> {gameStats.playtime} hours
            </p>
            <p className="text-sm mt-2">
              <strong>Popularity Score:</strong> {gameStats.metacritic || "N/A"}
            </p>
            <p className="text-sm mt-2">
              <strong>Number of Ratings:</strong> {gameStats.ratings_count.toLocaleString()} players
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
