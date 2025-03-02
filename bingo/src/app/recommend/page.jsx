'use client'
import React, { useState, useEffect } from "react";
import BingoMenu from "@/components/BingoMenu";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, orderBy, limit, 
    getFirestore, where } from "firebase/firestore"; 
import { app, auth } from "@/app/Firebase/config"; 

const db = getFirestore(app);
const gamesCollection = collection(db, "games");

/**
 * @param {*} tagCounts list of tags from all user's textbox
 * @returns JSON list of {tags, ranking}. 
 * From most occured to least occured.
 */
function selectFavoriteTags(tagCounts) {
    let sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
    let totalOccurrences = sortedTags.reduce((sum, [, count]) => sum + count, 0);
    let threshold = totalOccurrences * 0.8;

    let selectedTags = [];
    let accumulated = 0;

    for (let [tag, count] of sortedTags) {
        selectedTags.push(tag);
        accumulated += count;
        if (accumulated >= threshold) break;
    }

    return selectedTags;
}

/**
 * Return 25 of the recommended games with filtering and weighting
 *  the genre tags
 * @param recommendingTags tag searches the firebase query
 * @param existGames list containing games that is already existed
 */
const fetchRecommended = async (recommendingTags, existGames) => {
    try {
        //return warning if something is wrong with recommendingTags
        if (!recommendingTags || recommendingTags.length === 0) {
            console.warn("No recommendation tags available.");
            return [];
        }

        console.log("Fetching games for tags:", recommendingTags);
        //firestore array-contains-any has hard limit of 10. so pass
        //10 most occured tags to filter
        const validTags = recommendingTags.slice(0, 10);

        const recommendQuery = query(
            gamesCollection,
            where("genre", "array-contains-any", validTags),
            orderBy("rating", "desc"),
            limit(25)
        );

        const querySnapshot = await getDocs(recommendQuery);

        let games = querySnapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title,
            genre: doc.data().genre,
            rating: doc.data().rating,
            votes: doc.data().votes,
            year: doc.data().year,
            plot: doc.data().plot
        }));

        // Filter out existing game IDs to prevent duplicates
        games = games.filter(game => !existGames.includes(game.id));

        return games;
    } catch (error) {
        console.error("Error fetching recommended games:", error);
        return [];
    }
};

/**
 * 
 * @param {string} gameTitle game's title name
 * @returns All information about the game.
 */
const fetchGameByTitle = async (gameTitle) => {
    const searchQuery = query(
        gamesCollection,
        where("title", "==", gameTitle)
    );
    const querySnapshot = await getDocs(searchQuery);

    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        genre: doc.data().genre,
        rating: doc.data().rating,
        title: doc.data().title,
        votes: doc.data().votes,
        year: doc.data().year,
        plot: doc.data().plot
    }));
};

const getRandomSelection = (array, count) => {
    let shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const GameRecommendation = () => {
    const router = useRouter();
    const [gameTitles, setGameTitles] = useState(["", "", "", "", "", ""]);
    const [recommendations, setRecommendations] = useState([]); 
    const [recommendationTags, setRecommendationTags] = useState([]); 
    const [genreCounts, setGenreCounts] = useState({});
    const [loading, setLoading] = useState(false);

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

            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-3">Game Recommendation System</h2>
                <p className="text-lg">Enter 1-6 of your favorite game titles</p>
                <div className="flex flex-col gap-3 mt-4">
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
                <div className="mt-8 w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-center text-xl font-semibold mb-3 text-blue-400">Recommended Games</h2>
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
            )}
        </div>
    );
};

export default GameRecommendation;
