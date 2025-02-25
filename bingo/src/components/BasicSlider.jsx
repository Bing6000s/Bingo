'use client';
import { useState } from "react";

const Slider = () => {
  const [value, setValue] = useState(5); // Default slider value

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-xl font-bold mb-4">Adjust Slider Value</h2>

      {/* Slider Input */}
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-64 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />

      {/* Display Slider Value */}
      <p className="mt-4 text-lg font-semibold">Value: {value}</p>
    </div>
  );
};

export default Slider;
