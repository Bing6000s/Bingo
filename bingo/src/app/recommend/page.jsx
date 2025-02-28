"use client";
import React, { useState } from "react";
import BingoMenu from "@/components/BingoMenu";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, orderBy, limit, getFirestore,where } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, auth } from "@/app/Firebase/config"; // Ensure Firebase is initialized


const db = getFirestore(app);
const gamesCollection = collection(db, "games");

// ✅ Fix: Make fetchTopRatedGames return a Promise directly
const fetchTopRatedGames = async () => {
    try {
        const topRatedQuery = query(gamesCollection, orderBy("rating", "desc"), limit(3));
        const querySnapshot = await getDocs(topRatedQuery);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            genre: doc.data().genre,
            rating: doc.data().rating,
            title: doc.data().title,
            votes: doc.data().votes,
            year: doc.data().year
        }));
    } catch (error) {
        console.error("Error fetching top-rated games:", error);
        return []; // Return an empty array in case of error
    }
};

const fetchGame = async (gameTitle) =>{

    const searchQuery = query(
      gamesCollection, 
      where("title", "==", gameTitle)
    );
    const querySnapshot = await getDocs(searchQuery);
    return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            genre: doc.data().genre,
            rating: doc.data().rating,
            title: doc.data().title,
            votes: doc.data().votes,
            year: doc.data().year
    }));
  
};

const GameRecommendation = () => {
    const router = useRouter();
    const [selectedType, setSelectedType] = useState("tags");
    const [gameTitles, setGameTitles] = useState(["", "", ""]);
    const [experience, setExperience] = useState(""); // Stores user experience text
    const [recommendations, setRecommendations] = useState([]); // ✅ Store fetched recommendations

    const handleInputChange = (index, value) => {
        const updatedTitles = [...gameTitles];
        updatedTitles[index] = value;
        setGameTitles(updatedTitles);
    };

    // ✅ Fix: Call fetchTopRatedGames() correctly and update state
    const handleRecommendation = async () => {
        try {
            const user = auth.currentUser; // ✅ Check if the user is authenticated
            if (!user) {
                console.error("User is not authenticated.");
                return;
            }

            const topGames = await fetchTopRatedGames();
            setRecommendations(topGames); // ✅ Update state with fetched recommendations
        } catch (error) {
            console.error("Error getting recommendations:", error);
        }
    };

    const gotoFeedback = () => {
      router.push("/feedback");
    };

    const tester = () => {
      fetchGame("Persona 4 Golden").then((games) => {
    games.forEach((game) => {
        console.log(`Title: ${game.title}`);
        console.log(`Genres: ${game.genre.join(", ")}`); // Print genres
    });
});
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-8">
            <title>Bingo - Recommend</title>

            <div className="w-full fixed top-0 left-0 bg-black z-10">
                <BingoMenu />
            </div>

            {/* Step 1: Choose Recommendation Type */}
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold mb-3">1</h2>
                <p className="text-xl font-semibold">Choose recommendation type</p>
                <div className="flex gap-4 mt-3">
                    <button
                        className={`p-4 rounded-lg w-48 border-2 ${selectedType === "tags" ? "border-blue-500 bg-gray-800" : "border-gray-600"}`}
                        onClick={() => setSelectedType("tags")}
                    >
                        By similar game tags
                    </button>
                    <button
                        className={`p-4 rounded-lg w-48 border-2 ${selectedType === "smart" ? "border-blue-500 bg-gray-800" : "border-gray-600"}`}
                        onClick={() => setSelectedType("smart")}
                    >
                        By telling your experience
                    </button>
                </div>
            </div>

            {/* Step 2: Enter Game Titles OR Experience */}
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold mb-3">2</h2>
                {selectedType === "tags" ? (
                    <>
                        <p className="text-xl font-semibold">Enter 1-3 of your favorite game titles</p>
                        <div className="flex flex-col gap-3 mt-4">
                            {gameTitles.map((title, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder="Enter game title..."
                                    value={title}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    className="w-80 p-3 bg-gray-800 rounded border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-xl font-semibold">Describe your experience with the last game</p>
                        <textarea
                            placeholder="Write about your experience..."
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="w-80 h-32 p-3 mt-3 bg-gray-800 rounded border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p>Are the games too difficult? Do you have time to play this game? Do you want more narrative? Or do you want more mechanics?</p>
                    </>
                )}
            </div>

            {/* Step 3: Get Recommendation Button */}
            <div className="text-center mt-6">
                <h2 className="text-lg font-bold mb-3">3</h2>
                <button
                    onClick={handleRecommendation}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg text-lg uppercase font-bold transition duration-300"
                >
                    Get recommendation
                </button>
            </div>

            {/* ✅ Display Recommended Games */}
            {recommendations.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-3">Recommended Games</h2>
                    <ul>
                        {recommendations.map((game) => (
                            <li key={game.id} className="text-lg">
                                {game.title} (Rating: {game.rating})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                <button 
                    onClick={gotoFeedback}
                    className="mt-3 px-6 py-3 text-black bg-white hover:bg-pink-50 rounded-lg shadow-lg text-lg uppercase font-bold transition duration-300"
                >
                    We want your feedback!
                </button>
            </div>
            <div>
              <button
                onClick={tester}
                className="mt-3 px-6 py-3 text-black bg-white hover:bg-pink-50" >
                  Tester
                </button>
            </div>
        </div>
    );
};

export default GameRecommendation;
