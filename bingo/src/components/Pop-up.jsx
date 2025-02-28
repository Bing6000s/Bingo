import { useState } from "react";

const Popup = ({ onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <p>This is a custom pop-up!</p>
                <button onClick={onClose} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

const App = () => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div>
            <button onClick={() => setShowPopup(true)} className="px-4 py-2 bg-green-500 text-white rounded">
                Show Pop-up
            </button>

            {showPopup && <Popup onClose={() => setShowPopup(false)} />}
        </div>
    );
};

export default App;
