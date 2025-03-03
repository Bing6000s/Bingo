'use client';
import { useState } from "react";
import BingoMenu from "@/components/BingoMenu";
import { collection, addDoc, getFirestore, Timestamp } from "firebase/firestore"; 
import { app } from "@/app/Firebase/config"; 

const db = getFirestore(app);
const feedbackCollection = collection(db, "UserFeedBack");

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmission = async () => {
    if (feedbacks.trim() === "") {
      setStatus("Feedback cannot be empty.");
      return;
    }

    try {
      await addDoc(feedbackCollection, {
        feedback: feedbacks,
        timestamp: Timestamp.now(),
      });

      setStatus("Feedback submitted successfully!");
      setFeedbacks("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setStatus("Failed to submit feedback.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-8">
      <div className='w-full fixed top-0 left-0 bg-black z-10'>
        <BingoMenu />
      </div>

      {/* Feedback Section */}
      <div className="mt-32 w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Share Your Feedback</h2>

        {/* Text Area */}
        <textarea
          className="w-full h-80 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your feedback here..."
          value={feedbacks}
          onChange={(e) => setFeedbacks(e.target.value)}
        />

        {/* Status Message */}
        {status && <p className="text-center mt-3">{status}</p>}

        {/* Submit Button */}
        <button
          className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          onClick={handleSubmission}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackTable;
