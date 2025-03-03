'use client'
import {gamesCollection, db} from "@/app/recommend/page"
import {getDocs, where, query} from "firebase/firestore";

/**
 * 
 * @param {string} gameTitle game's title name
 * @returns All information about the game.
 */
export const fetchGameByTitle = async (gameTitle) => {
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