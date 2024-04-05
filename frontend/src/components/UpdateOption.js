import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.
import bggreen from '../assets/bggreen.jpg'; // Import the image
import CustomPopup from './CustomPopup'; // Import the modal component

export default function UpdateEvent() {
  const [selectedOption, setSelectedOption] = useState(null);

  const [updatedOptionCategory, setUpdatedOptionCategory] = useState("");
  const [updatedOptionName, setUpdatedOptionName] = useState("");
  const [updatedOptionDescription, setUpdatedOptionDescription] = useState("");
  const [updatedOptionPrice, setUpdatedOptionPrice] = useState(0); // Total cost state
  const [file, setFile] = useState(null);

  const { optionId } = useParams(); // Get the optionId from URL params
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'



  useEffect(() => {
    // Fetch event data based on eventId when the component mounts
    async function getOptionDetails() {
      try {
        const response = await axios.get(`http://localhost:8070/option/getOption/${optionId}`);
        setSelectedOption(response.data.option);
        console.log("Fetched Option Details Successfully");

       
      } catch (error) {
        console.error("Error fetching option data:", error.message);
        alert("Error fetching option data. Please try again.");
      }
    }

    getOptionDetails();
  }, [optionId]);

  
  
  useEffect(() => {
    if (selectedOption) {
        setUpdatedOptionCategory(selectedOption.optionCategory || "");
        setUpdatedOptionName(selectedOption.optionName || "");
        setUpdatedOptionDescription(selectedOption.optionDescription || "");
        setUpdatedOptionPrice(selectedOption.optionPrice || 0);
      
    }
  }, [selectedOption]);



  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const formData = new FormData();
    formData.append("optionName", updatedOptionName);
    formData.append("optionCategory", updatedOptionCategory);
    formData.append("optionDescription", updatedOptionDescription);
    formData.append("optionPrice", updatedOptionPrice);
    formData.append("file", file);

    try {
      await axios.put(`http://localhost:8070/option/updateOption/${optionId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Custom success notification
      setPopupMessage("Option details updated successfully!");
      setPopupType('info');
      setIsPopupOpen(true);


    } catch (error) {
      console.error("Error updating option details:", error.message);
      // Custom success notification
      setPopupMessage("Error updating option details. Please try again.");
      setPopupType('error');
      setIsPopupOpen(true);
    }
  };

  if (!selectedOption) {
    return <div>Loading...</div>;
  }

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

        <div className="container my-10 max-w-4xl mx-auto p-10 bg-theme-green shadow-2xl shadow-green-400 rounded-[50px] overflow-auto font-lexend">
          <div className="text-5xl font-extrabold ...">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-black justify-center">
              Update Event
            </span>
          </div>

          <form className="mt-3" onSubmit={handleUpdate}>

            {/* Option Category */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="optionCategory">Option Category</label>
              <select
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                placeholder="Select Category"
                name="optionCategory"
                id="optionCategory"
                value={updatedOptionCategory} 
                onChange={(e) => setUpdatedOptionCategory(e.target.value)}
              >
                <option value="" disabled>Select Category</option>
                <option value="Decoration">Decoration</option>
                <option value="Catering">Catering</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Photography">Photography</option>
                <option value="Other">Other</option>
              </select>
            </div>


            {/* Option Name */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="optionName">Option Name</label>
              <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                type="text" placeholder="Enter Name" name="optionName" value={updatedOptionName}
                onChange={(e) => setUpdatedOptionName(e.target.value)}
              />
            </div>


            {/* Option Description */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="optionDescription">Option Description</label>
              <textarea cols="50" rows="8" placeholder="Enter Description" name="optionDescription"
                value={updatedOptionDescription}
                className="h-24 w-full p-1 border border-gray-200 rounded text-lg font-lexend"
                onChange={(e) => setUpdatedOptionDescription(e.target.value)}
              ></textarea>
            </div>


            {/* Option Price */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="optionPrice">Option Price</label>
              <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                type="number" placeholder="Enter Price" name="optionPrice" value={updatedOptionPrice}
                onChange={(e) => setUpdatedOptionPrice(e.target.value)}
              />
            </div>

            {/* Image Upload */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="file"> Option Image </label>
              <input type="file" id="file" name="file" accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full p-2 border border-gray-200 rounded-lg text-lg font-lexend focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>


            <div className="flex justify-center mt-5">
              <button className="bg-green-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950" type="submit" name="submit" id="submit"> Update Option </button>

              <Link to={`/allOptions`} className="ml-5 bg-red-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-red-400 hover:border-red-950" type="button"   > Cancel </Link>
            </div>

          </form>
        </div>

      {/* Your component structure */}
      <CustomPopup
          isOpen={isPopupOpen}
          message={popupMessage}
          onClose={() => {
            setIsPopupOpen(false);
            navigate("/allOptions");
          }}
          type={popupType}
        />

      </div>
    </div>
  );
}
