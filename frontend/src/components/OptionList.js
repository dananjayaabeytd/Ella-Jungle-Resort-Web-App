import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bggreen from '../assets/bggreen.jpg'; // Import the image

export default function OptionList() {
    
  const [allOptions, setOption] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  useEffect(() => {
    async function getOptions() {
      try {
        const response = await axios.get("http://localhost:8070/option/allOptions");
        setOption(response.data);
      } catch (error) {
        alert(error.message);
      }
    }
    getOptions();
  }, []);

  const handleDeleteClick = (optionId) => {
    setSelectedOptionId(optionId); // Set the option ID to state
    setIsModalOpen(true); // Show the modal
  };

  const confirmDelete = async () => {
    if (selectedOptionId) {
      try {
        await axios.delete(`http://localhost:8070/option/deleteOption/${selectedOptionId}`);
        alert("Option removed successfully!");
        setIsModalOpen(false); // Close the modal
        setOption(allOptions.filter(option => option._id !== selectedOptionId)); // Update state to remove the item
      } catch (error) {
        console.error("Error deleting option:", error.message);
        alert("Error deleting option. Please try again.");
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
                                            <img className="w-full h-full object-fill mt-3" src={`http://localhost:8070/Images/${option.optionImage}`} alt="Event" />
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
                                                    onClick={() => handleDeleteClick(option._id)}
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


                
        {/* Pop-up Modal for deletion confirmation */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
              <div className="relative top-1/3  mx-auto p-5 w-96 shadow-lg rounded-3xl bg-white border-secondary-green " >
                <div className="mt-3 text-center">
                  <h3 className="leading-6 text-xl font-bold text-green-800 font-inika pt-4">Removal Confirmation</h3>
                  <div className="mt-2 px-7 py-3">
                    <p className="text-md font-mclaren text-gray-500">
                      Are you sure you want to remove this option? This action cannot be undone</p>
                  </div>
                  <div className="items-center px-4 py-3">
                    <button id="delete-btn" 
                    className="px-4 py-2 mx-2 font-mclaren bg-red-500 text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" 
                    onClick={confirmDelete}>
                      Remove
                    </button>
                    <button 
                    className="px-4 py-2 mx-2 font-mclaren bg-gray-500 text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" 
                    onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
            </div>
        </div>
    );
}


