'use client'
import React, { useState, useEffect } from "react";
import BingoMenu from "@/components/BingoMenu";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, orderBy, limit, 
    getFirestore, where } from "firebase/firestore"; 
import { app, auth } from "@/app/Firebase/config"; 
import { selectFavoriteTags } from "@/backend/filtering/SelectFavoriteTags";
import {getRandomSelection} from "@/backend/filtering/GetRandomSelection";
import {fetchRecommended} from "@/backend/recommend/FetchRecommend"
import { fetchGameByTitle } from "@/backend/recommend/FetchGameByTitle";
/**
 * Figure out why Firebase files cannot be divided into smaller modules.
 */

export const db = getFirestore(app);
export const gamesCollection = collection(db, "games");


const GameRecommendation = () => {
    const router = useRouter();
    const [gameTitles, setGameTitles] = useState(["", "", "", "", "", ""]);
    const [recommendations, setRecommendations] = useState([]); 
    const [recommendationTags, setRecommendationTags] = useState([]); 
    const [genreCounts, setGenreCounts] = useState({});
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(false);

    const handleInputChange = (index, value) => {
        const updatedTitles = [...gameTitles];
        updatedTitles[index] = value;
        setGameTitles(updatedTitles);
    };

    const fetchGameTags = async () => {
        try {
            const fetchedGameGenres = await Promise.all(
                gameTitles
                    .filter(title => title.trim() !== "")
                    .map(async (title) => {
                        const games = await fetchGameByTitle(title);
                        return games.flatMap(game => game.genre);
                    })
            );

            const sortedTags = fetchedGameGenres.flat();
            const counts = sortedTags.reduce((acc, genre) => {
                acc[genre] = (acc[genre] || 0) + 1;
                return acc;
            }, {});

            console.log("Sorted tags:", sortedTags);
            console.log("Genre Counts:", counts);

            const weightedTags = selectFavoriteTags(counts);
            setGenreCounts(counts);
            setRecommendationTags(weightedTags);
        } catch (error) {
            console.error("Error fetching game tags:", error);
        }
    };

    useEffect(() => {
        if (recommendationTags.length > 0) {
            const fetchData = async () => {
                setLoading(true);
                const recommendedGames = await fetchRecommended(recommendationTags, recommendations.map(game => game.id));

                if (recommendedGames.length > 0) {
                    const randomSelection = getRandomSelection(recommendedGames, 3);
                    setRecommendations(randomSelection);
                } else {
                    setRecommendations([]);
                }
                setLoading(false);
            };
            fetchData();
        }
    }, [recommendationTags]);

    const handleRecommendation = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                console.error("User is not authenticated.");
                setRecommendations(["Warning: User is not authenticated."]);
                return;
            }

            setLoading(true);
            await fetchGameTags(); 
            setFeedback(true);
        } catch (error) {
            console.error("Error getting recommendations:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-8">
            <title>Bingo - Recommend</title>

            <div className="w-full fixed top-0 left-0 bg-black z-10">
                <BingoMenu />
            </div>
        <div className=" mt-40">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-3">Game Recommendation System</h2>
                <p className="text-lg">Enter 1-6 of your favorite game titles</p>
                <p className="text-lg">The name must follow exactly to IMDB's listing. For example, Red Dead Redemption II, Baldur's Gate III, Apex Legends...</p>
                <div className="flex flex-col gap-3 mt-4 items-center text-center">
                    {gameTitles.map((title, index) => (
                        <input
                            key={index}
                            type="text"
                            placeholder={`Game title ${index + 1}`}
                            value={title}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            className="w-96 p-3 bg-gray-800 rounded-lg border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>
            </div>

            <div className="text-center mt-6">
                <button
                    onClick={handleRecommendation}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg text-lg uppercase transition duration-300"
                    disabled={loading}
                >
                    {loading ? "Fetching..." : "Get Recommendation"}
                </button>
            </div>

            {recommendations.length > 0 && (
                <div className="flex justify-center items-center">
                <div className="mt-8 w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className=" text-xl font-semibold mb-3 text-blue-400">Recommended Games</h2>
                    <ul className="space-y-4">
                        {recommendations.map((game) => (
                            <li key={game.id} className="text-lg flex flex-col items-center border-b pb-3 border-gray-600 last:border-0">
                                <strong className="text-white text-2xl">{game.title}</strong>
                                <p className="text-gray-300">⭐ Rating: {game.rating}</p>
                                <p className="text-gray-400">🎮 Genres: {game.genre.join(", ")}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                </div>
            )}
            <div className="mt-4 text-center justify-center item-center">
                {feedback && (<button 
                className="px-10 py-3 bg-gradient-to-r from-red-700 to-gray-950" 
                onClick={() => router.push('/Feedback')}>
                    We wants your Feedback!
                </button>)}
            </div>

            </div>

        </div>
    );
};

export default GameRecommendation;
