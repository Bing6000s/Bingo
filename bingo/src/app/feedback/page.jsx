'use client';
import { useState } from "react";
import BingoMenu from "@/components/BingoMenu";

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, feedback: "" },
    { id: 2, feedback: "" },
    { id: 3, feedback: "" },
    { id: 4, feedback: "" },
  ]);

  const handleFeedbackChange = (index, value) => {
    const updatedFeedbacks = [...feedbacks];
    updatedFeedbacks[index].feedback = value;
    setFeedbacks(updatedFeedbacks);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-8">
      <div className='w-full fixed top-0 left-0 bg-black z-10'>
        <BingoMenu/>
      </div>
<div>
    <div className="mt-60">
      <h2 className="text-2xl font-bold mt-auto">Recommendation Feedback</h2>

      <div className="w-full max-w-2xl ">
        <table className="w-full border border-gray-600 rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-3 border border-gray-600">Recommend ID</th>
              <th className="p-3 border border-gray-600">Leave Feedback</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((item, index) => (
              <tr key={item.id} className="bg-gray-800">
                <td className="p-3 text-center border border-gray-600">{item.id}</td>
                <td className="p-3 border border-gray-600">
                  <input
                    type="text"
                    value={item.feedback}
                    onChange={(e) => handleFeedbackChange(index, e.target.value)}
                    className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your feedback..."
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
</div>
      </div>
    </div>
  );
};

export default FeedbackTable;
