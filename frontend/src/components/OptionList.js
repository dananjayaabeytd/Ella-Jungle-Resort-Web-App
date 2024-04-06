import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'; // Import useSelector
import { Link } from "react-router-dom";
import bggreen from '../assets/bggreen.jpg'; // Import the image
import ConfirmDeletion from './ConfirmDeletion'; // Import the modal component
import CustomPopup from './CustomPopup'; // Import the modal component
import EventHeader from './EventHeader';

export default function OptionList() {
    
  const [allOptions, setOption] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'

  const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`


  useEffect(() => {
    async function getOptions() {
      try {
        const response = await axios.get("http://localhost:5000/option/allOptions");
        setOption(response.data);
      } catch (error) {
        alert(error.message);
      }
    }
    getOptions();
  }, []);


  const confirmDelete = async () => {
    if (selectedOptionId) {
      try {
        await axios.delete(`http://localhost:5000/option/deleteOption/${selectedOptionId}`);
        // Custom success notification
        setPopupMessage("Option removed successfully!");
        setPopupType('info');
        setIsPopupOpen(true);
        setOption(allOptions.filter(option => option._id !== selectedOptionId)); // Update state to remove the item

      } catch (error) {
        console.error("Error deleting option:", error.message);
        alert("Error deleting option. Please try again.");
        // Custom success notification
        setPopupMessage("Error removing option. Please try again.");
        setPopupType('error');
        setIsPopupOpen(true);
      }
    }
  };

    // Get unique categories
    const categories = [...new Set(allOptions.map((option) => option.optionCategory))];

    return (
        <div className="relative min-h-screen">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-fixed"
                style={{
                    backgroundImage: `url(${bggreen})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>

            {/* Content Wrapper */}
            <div className="relative z-10 flex flex-col justify-items-stretch mr-20 ml-20 min-h-screen p-2 items-center justify-between">
              {/* Call Header */}
              <EventHeader/>

            <Link to="/addOption" className="ml-5 mb-6 text-white text-xl font-mclaren px-4 py-1 bg-blue-500 hover:bg-blue-800 rounded-3xl items-center">
          Add Option
        </Link>

                {/* Loop through categories */}
                {categories.map((category, index) => (
                    <div key={index}>
                        {/* Category Title */}
                        <div className="container mt-16 max-w-5xl mx-auto">
                            <p className="bg-secondary-green rounded-3xl p-1 text-2xl font-bold text-green-800 font-inika text-center">
                                {category} Options
                            </p>
                        </div>
                        {/* Cards for each category */}
                        <div className="items-center justify-between grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  w-full p-2">
                            {/* Cards for this category */}
                            {allOptions
                                .filter((option) => option.optionCategory === category)
                                .map((option) => (
                                    <div key={option._id} className="bg-white max-w-md max-h-ful px-4 m-4 rounded-t-md rounded-b-3xl border-secondary-green border-double border-8 overflow-hidden shadow-2xl hover:scale-up-110">
                                        <div className="container shadow-md rounded-3xl overflow-hidden w-full max-h-80">
                                            <img className="w-full h-full object-fill mt-3" src={`http://localhost:5000/Images/${option.optionImage}`} alt="Event" />
                                        </div>
                                        <div className="px-0 mb-3 mt-2 rounded-xl">
                                            <div className="pb-1">
                                                <p className="text-lg font-bold text-green-800 font-inika text-center">{option.optionName}</p>
                                            </div>
                                            <p className="text-sm font-mclaren text-center">{option.optionDescription}</p>
                                            <p className="text-base text-blue-700 font-bold font-mclaren text-center pt-2 pb-1">{option.optionPrice} LKR</p>
                                            <div className="mb-4 mt-1 flex justify-center items-center">
                                                {/* Using Link component for Update button */}
                                                <Link
                                                    to={`/updateOption/${option._id}`}
                                                    className="text-white text-base font-mclaren px-4 py-0 bg-theme-green hover:bg-green-800 rounded-3xl"
                                                >
                                                    Update
                                                </Link>
                                                <button
                                                    className="ml-5 text-white text-base font-mclaren px-4 py-0 bg-red-500 hover:bg-red-800 rounded-3xl"
                                                    onClick={() => {
                                                      setSelectedOptionId(option._id);
                                                      setIsModalOpen(true);
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}


                
            
      {/* Use the Confirm Deletion Modal here */}
      <ConfirmDeletion
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* Your component structure */}
      <CustomPopup
          isOpen={isPopupOpen}
          message={popupMessage}
          onClose={() => {
            setIsPopupOpen(false);
            setIsModalOpen(false); // Close the modal
          }}
          type={popupType}
        />

            </div>
        </div>
    );
}


