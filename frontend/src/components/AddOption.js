
import React, {useState} from 'react'
import bggreen from '../assets/bggreen.jpg'; // Import the image

import axios from "axios"   //axios for making HTTP requests
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import CustomPopup from './CustomPopup'; // Import the modal component


export default function AddOption() {
    
  const [optionCategory, setOptionCategory] = useState("");
  const [optionName, setOptionName] = useState("");
  const [optionDescription, setOptionDescription] = useState("");
  const [optionPrice, setOptionPrice] = useState("");  
  const [file, setFile] = useState(null);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'


  const navigate = useNavigate();


  // Function to handle form submission
  function sendData(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("optionCategory", optionCategory);
    formData.append("optionName", optionName);
    formData.append("optionDescription", optionDescription);
    formData.append("optionPrice", optionPrice);
    formData.append("file", file);

    axios.post("http://localhost:8070/option/addOption", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
         // Custom success notification
         setPopupMessage("Option added successfully!");
         setPopupType('info');
         setIsPopupOpen(true);

        setOptionCategory("");
        setOptionName("");
        setOptionDescription("");
        setOptionPrice("");
        setFile(null);

      })
      .catch((err) => {
        alert(err);
        // Custom success notification
        setPopupMessage("Error adding option. Please try again.");
        setPopupType('error');
        setIsPopupOpen(true);
      });
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
              Add Option
            </span>
          </div>
          
          <form className="mt-3" onSubmit={sendData}>

            {/* Option Category */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="optionCategory">Option Category</label>
              <select
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                placeholder="Select Category"
                name="optionCategory"
                id="optionCategory"
                value={optionCategory}
                onChange={(e) => setOptionCategory(e.target.value)}
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
                type="text" placeholder="Enter Name" name="optionName" value={optionName}
                onChange={(e) => setOptionName(e.target.value)}
              />
            </div>



            {/* Event Description */}    
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="optionDescription">Option Description</label>
              <textarea cols="50" rows="8" placeholder="Enter Description" name="optionDescription" required value={optionDescription}
                className="h-24 w-full p-1 border border-gray-200 rounded text-lg font-lexend"
                onChange={(e) => setOptionDescription(e.target.value)}
              > </textarea>
            </div>
            

            

            {/* Option Price */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="optionPrice">Option Price</label>
              <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                type="number" placeholder="Enter Price" name="optionPrice" value={optionPrice}
                onChange={(e) =>  setOptionPrice(e.target.value)}
              />
            </div>


            {/* Event Image */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="file"> Option Image </label>
              <input type="file" id="file" name="file" accept="image/*" required
                className="w-full p-2 border border-gray-200 rounded-lg text-lg font-lexend focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>


            <div className="flex justify-center mt-5">
              <button className="bg-green-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950" type="submit" name="submit" id="submit"> Submit </button>

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


