import React, { useState, useEffect } from "react";
import bggreen from '../assets/bggreen.jpg'; // Import the image
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";

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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <Link to="/addOption" className="ml-5 mb-6 text-white text-xl font-mclaren px-4 py-1 bg-blue-500 hover:bg-blue-800 rounded-3xl items-center">
          Add Option
        </Link>
  
        {/* Your scrolling content */}
        <div className="container my-5 max-w-5xl mx-auto p-5 bg-white bg-opacity-50 shadow-2xl rounded-3xl overflow-auto border-2 border-green-700">
        <div className="grid grid-cols-2 gap-16 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1">
        
      
        </div>
            <div className="px-2">
                <table className="table-auto w-full">
                    
                    <tr>
                        <th className="px-4 py-2 text-left">Option</th>
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-left" >Price</th>
                        <th className="m-4 py-2" colSpan="2">Actions</th>
                    </tr>
                    
                    <tbody>
                    <tr >
                        <th className="text-xl font-bold text-green-800 font-inika pt-4" colSpan="5">Catering Options</th>
                    </tr>
                        {allOptions && allOptions.filter((option) => option.optionCategory === "Catering").map((option) => (
          
                        <tr key={option._id}>
                            <td className="text-md font-bold text-green-800 font-inika">{option.optionName}</td>
                            <td className="text-sm font-mclaren">{option.optionDescription} </td>
                            <td className="text-md font-bold text-blue-600">{option.optionPrice} LKR</td> 
                            <td>
                              <Link to={`/updateOption/${option._id}`} 
                              className=" text-black text-xs font-mclaren px-3 py-0   bg-theme-green hover:bg-green-800 rounded-3xl">Update</Link>
                            </td>
                                
                                <td><button className="ml-5 text-black text-xs font-mclaren px-3 py-0  bg-red-500 hover:bg-red-800 rounded-3xl" onClick={() => handleDeleteClick(option._id)}>
                                  Remove
                                </button></td>   
                        </tr>  
                    ))}
                    <tr >
                        <th className="text-xl font-bold text-green-800 font-inika pt-4" colSpan="5">Entertainment Options</th>
                    </tr>
                        {allOptions && allOptions.filter((option) => option.optionCategory === "Entertainment").map((option) => (
          
                        <tr key={option._id}>
                            <td className="text-md font-bold text-green-800 font-inika">{option.optionName}</td>
                            <td className="text-sm font-mclaren">{option.optionDescription}</td>
                            <td className="text-md font-bold text-blue-600">{option.optionPrice} LKR</td> 
                            <td>
                              <Link to={`/updateOption/${option._id}`} 
                              className=" text-black text-xs font-mclaren px-3 py-0   bg-theme-green hover:bg-green-800 rounded-3xl">Update</Link>
                            </td>
                                <td><button className="ml-5 text-black text-xs font-mclaren px-3 py-0   bg-red-500 hover:bg-red-800 rounded-3xl" onClick={() => handleDeleteClick(option._id)}>
                                  Remove
                                </button></td>   
                        </tr>  
                    ))}
    
                    <tr >
                        <th className="text-xl font-bold text-green-800 font-inika pt-4" colSpan="5">Parking Options</th>
                    </tr>
                        {allOptions && allOptions.filter((option) => option.optionCategory === "Parking").map((option) => (
          
                        <tr key={option._id}>
                            <td className="text-sm font-bold text-green-800 font-inika">{option.optionName}</td>
                            <td className="text-sm font-mclaren">{option.optionDescription}</td>
                            <td className="text-md font-bold text-blue-600">{option.optionPrice} LKR</td>
                            <td>
                              <Link to={`/updateOption/${option._id}`} 
                              className=" text-black text-xs font-mclaren px-3 py-0   bg-theme-green hover:bg-green-800 rounded-3xl">Update</Link>
                            </td>
                                <td><button className="ml-5 text-black text-xs font-mclaren px-3 py-0   bg-red-500 hover:bg-red-800 rounded-3xl" onClick={() => handleDeleteClick(option._id)}>
                                  Remove
                                </button></td>   
                        </tr>  
                    ))}
    
                    
    <tr >
                        <th className="text-xl font-bold text-green-800 font-inika pt-4" colSpan="5">Photography Options</th>
                    </tr>
                        {allOptions && allOptions.filter((option) => option.optionCategory === "Photography").map((option) => (
          
                        <tr key={option._id}>
                            <td className="text-md font-bold text-green-800 font-inika">{option.optionName}</td>
                            <td className="text-sm font-mclaren">{option.optionDescription}</td>
                            <td className="text-md font-bold text-blue-600">{option.optionPrice} LKR</td>
                            <td>
                              <Link to={`/updateOption/${option._id}`} 
                              className=" text-black text-xs font-mclaren px-3 py-0   bg-theme-green hover:bg-green-800 rounded-3xl">Update</Link>
                            </td>
                                <td><button className="ml-5 text-black text-xs font-mclaren px-3 py-0   bg-red-500 hover:bg-red-800 rounded-3xl" onClick={() => handleDeleteClick(option._id)}>
                                  Remove
                                </button></td>   
                        </tr>  
                    ))}
    
    
                    
    <tr >
                        <th className="text-xl font-bold text-green-800 font-inika pt-4" colSpan="5">Other Options</th>
                    </tr>
                        {allOptions && allOptions.filter((option) => option.optionCategory === "Other").map((option) => (
          
                        <tr key={option._id}>
                            <td className="text-md font-bold text-green-800 font-inika">{option.optionName}</td>
                            <td className="text-sm font-mclaren">{option.optionDescription}</td>
                            <td className="text-md font-bold text-blue-600">{option.optionPrice} LKR</td>
                            <td>
                              <Link to={`/updateOption/${option._id}`} 
                              className=" text-black text-xs font-mclaren px-3 py-0  bg-theme-green hover:bg-green-800 rounded-3xl">Update</Link>
                            </td>
                                <td><button className="ml-5 text-black text-xs font-mclaren px-3 py-0   bg-red-500 hover:bg-red-800 rounded-3xl" onClick={() => handleDeleteClick(option._id)}>
                                  Remove
                                </button></td>   
                        </tr>  
                    ))}
                    </tbody>
                </table>
    
                
                <div className="price ">
                </div>
      
                {/* Event Description with McLaren font */}
                </div>
      
                <div className="flex justify-center items-center">
                          
                </div>
  
          {/* Pop-up Modal for deletion confirmation */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
              <div className="relative top-1/3  mx-auto p-5 border w-96 shadow-lg rounded-3xl bg-white roun">
                <div className="mt-3 text-center">
                  <h3 className="leading-6 text-xl font-bold text-green-800 font-inika pt-4">Removal Confirmation</h3>
                  <div className="mt-2 px-7 py-3">
                    <p className="text-sm font-mclaren text-gray-500">
                      Are you sure you want to remove this option? This action cannot be undone</p>
                  </div>
                  <div className="items-center px-4 py-3">
                    <button id="delete-btn" 
                    className="px-4 py-2 mx-2 font-mclaren bg-red-500 text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" 
                    onClick={confirmDelete}>
                      Delete
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
    </div>
  );
}


