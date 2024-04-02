import React, { useState, useEffect } from "react";
import bggreen from '../assets/bggreen.jpg'; // Import the image
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import christmas1 from '../assets/christmas1.jpg';

import axios from "axios";

function OptionList() {

  const [allOptions, setOption] = useState([]);

  useEffect(() => {
    function getOptions() {
      axios.get("http://localhost:8070/option/allOptions")
      .then((res) => {
        setOption(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }

    getOptions();
  }, []);


  const handleDeleteClick = async (optionId) => {
    try {
      await axios.delete(`http://localhost:8070/option/deleteOption/${optionId}`);
      alert("Option deleted successfully!");
      window.location.reload(); // Refresh the page after deletion
    } catch (error) {
      console.error("Error deleting option:", error.message);
      alert("Error deleting option. Please try again.");
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
   
    
            
  
      {/* Your scrolling content */}
      
      <div className="container bg-fixed my-5 max-w-5xl mx-auto p-5 bg-white bg-opacity-50 shadow-2xl shadow-theme-green rounded-3xl overflow-auto border-2 border-green-700">
      
  
      <div className="grid grid-cols-2 gap-16 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1">
        
      
    </div>
        <div className="px-0">
            <table className="table-auto w-full">
                
                <tr>
                    <th className="px-4 py-2 text-left">OptionName</th>
                    <th className="px-4 py-2 text-left">OptionPrice</th>
                    <th className="px-4 py-2 text-left" >OptionCategory</th>
                    <th className="px-4 py-2 text-center" colSpan="3">Actions</th>
                </tr>
                
                <tbody>
                <tr >
                    <th className="event-name text-xl font-bold text-green-800 font-inika" colspan="6">Catering Services</th>
                </tr>
                    {allOptions && allOptions.filter((option) => option.optionCategory === "Entertainment").map((option) => (
      
                    <tr key={option._id}>
                        <td className="event-name text-sm font-bold text-green-800 font-inika">{option.optionName}</td>
                        <td className="Product-description text-sm font-mclaren">{option.optionPrice}</td>
                        <td className="new-price text-sm font-bold text-blue-600">{option.optionCategory}</td>
                        <td><Link 
                            to={`/update/${option._id}`} 
                            className=" text-white text-xs font-mclaren px-4 py-1  bg-theme-green hover:bg-green-800 rounded-3xl">
                            Update
                            </Link></td>
                            <td><button className="ml-5 text-white text-xs font-mclaren px-4 py-1  bg-blue-500 hover:bg-blue-800 rounded-3xl">
                                View
                            </button></td>
                            <td><button className="ml-5 text-white text-xs font-mclaren px-4 py-1  bg-red-500 hover:bg-red-800 rounded-3xl" onClick={() => handleDeleteClick(option._id)}>
                                Delete
                            </button></td>   
                    </tr>  
                ))}
                <tr >
                    <th className="event-name text-xl font-bold text-green-800 font-inika" colspan="6">Entertainment Options</th>
                </tr>
                    {allOptions && allOptions.filter((option) => option.optionCategory === "Catering").map((option) => (
      
                    <tr key={option._id}>
                        <td className="event-name text-sm font-bold text-green-800 font-inika">{option.optionName}</td>
                        <td className="Product-description text-sm font-mclaren">{option.optionPrice}</td>
                        <td className="new-price text-sm font-bold text-blue-600">{option.optionCategory}</td>
                        <td><Link 
                            to={`/update/${option._id}`} 
                            className=" text-white text-xs font-mclaren px-4 py-1  bg-theme-green hover:bg-green-800 rounded-3xl">
                            Update
                            </Link></td>
                            <td><button className="ml-5 text-white text-xs font-mclaren px-4 py-1  bg-blue-500 hover:bg-blue-800 rounded-3xl">
                                View
                            </button></td>
                            <td><button className="ml-5 text-white text-xs font-mclaren px-4 py-1  bg-red-500 hover:bg-red-800 rounded-3xl" onClick={() => handleDeleteClick(option._id)}>
                                Delete
                            </button></td>   
                    </tr>  
                ))}

<tr >
                    <th className="event-name text-xl font-bold text-green-800 font-inika" colspan="6">Parking Services</th>
                </tr>
                    {allOptions && allOptions.filter((option) => option.optionCategory === "Parking").map((option) => (
      
                    <tr key={option._id}>
                        <td className="event-name text-sm font-bold text-green-800 font-inika">{option.optionName}</td>
                        <td className="Product-description text-sm font-mclaren">{option.optionPrice}</td>
                        <td className="new-price text-sm font-bold text-blue-600">{option.optionCategory}</td>
                        <td><Link 
                            to={`/update/${option._id}`} 
                            className=" text-white text-xs font-mclaren px-4 py-1  bg-theme-green hover:bg-green-800 rounded-3xl">
                            Update
                            </Link></td>
                            <td><button className="ml-5 text-white text-xs font-mclaren px-4 py-1  bg-blue-500 hover:bg-blue-800 rounded-3xl">
                                View
                            </button></td>
                            <td><button className="ml-5 text-white text-xs font-mclaren px-4 py-1  bg-red-500 hover:bg-red-800 rounded-3xl" onClick={() => handleDeleteClick(option._id)}>
                                Delete
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


              {/* Using Link component for View button */}
              

              

              
            </div>
                        
  
     
    </div>
    {/* Scrolling content End*/}
  
       
      
    
    </div>
  </div>
  )
}

export default OptionList
