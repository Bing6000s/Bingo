

'use client'
import { getDocs, query, orderBy, limit, where } from "firebase/firestore"; 
import {gamesCollection, db} from "@/app/recommend/page"
/**
 * Return 25 of the recommended games with filtering and weighting
 *  the genre tags
 * @param recommendingTags tag searches the firebase query
 * @param existGames list containing games that is already existed
 */
export const fetchRecommended = async (recommendingTags, existGames) => {
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
