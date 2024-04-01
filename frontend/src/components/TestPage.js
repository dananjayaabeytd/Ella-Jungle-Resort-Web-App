
//This code is to use to real time update the prices of decroation Preferences, But this does not save the false and true correctly

import React, { useState, useEffect } from 'react'
import bggreen from '../assets/bggreen.jpg'; // Import the image

import axios from "axios"   //axios for making HTTP requests
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.


export default function TestPage() {
    
  const [eventName, setEventName] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [file, setFile] = useState(null);
  const [totalCost, setTotalCost] = useState(0);


  const navigate = useNavigate();

  
    // Decoration preferences with prices
    const decorationPrices = {
      minimalist: 50,
      elegant: 100,
      // Add more options with their prices here
    };

    
  // Function to calculate total cost
  const calculateTotalCost = () => {
    let cost = 0;
    selectedPreferences.forEach((preference) => {
      cost += decorationPrices[preference];
    });
    return cost;
  };

  
  // Function to handle checkbox changes
  const handleCheckboxChange = (preference) => {
    const updatedPreferences = [...selectedPreferences];
    if (updatedPreferences.includes(preference)) {
      updatedPreferences.splice(updatedPreferences.indexOf(preference), 1);
    } else {
      updatedPreferences.push(preference);
    }
    setSelectedPreferences(updatedPreferences);
  };



  function sendData(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("eventName", eventName);
    formData.append("file", file);

  // Append the decorationPreferences object with minimalistChecked and elegantChecked
  // formData.append("decorationPreferences.minimalistChecked", minimalistChecked ? "true" : "false");
  // formData.append("decorationPreferences.elegantChecked", elegantChecked ? "true" : "false");
  
    // Append selected preferences to formData
    selectedPreferences.forEach((preference) => {
      formData.append(`decorationPreferences.${preference}`, "true");
    });

    axios
      .post("http://localhost:8070/event/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Event Added");
        setEventName("");
        setSelectedPreferences([]);
        setFile(null);
        setTotalCost(0);

        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  }


  
  // Calculate total cost whenever selected preferences change
  useEffect(() => {
    const cost = calculateTotalCost();
    setTotalCost(cost);
  }, [selectedPreferences]);

  
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
        Add Event
      </span>
    </div>
    
    <form className="mt-3" encType="multipart/form-data" onSubmit={sendData}>

      {/* Event Name */}
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-green-800" htmlFor="eventName">Event Name</label>
        <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
          type="text"
          placeholder="Enter Name"
          name="eventName"
          value={eventName}
          onChange={(e) => {
            setEventName(e.target.value);
          }}
        />
      </div>
      
            {/* Decoration Preferences */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800">Decoration Preferences:</label>
              {Object.entries(decorationPrices).map(([preference, price]) => (
                <div key={preference} className="form-check">
                  <input
                    type="checkbox"
                    id={preference}
                    name={preference}
                    checked={selectedPreferences.includes(preference)}
                    onChange={() => handleCheckboxChange(preference)}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <label htmlFor={preference} className="ml-2 text-green-800">
                    {preference.charAt(0).toUpperCase() + preference.slice(0)} (${price})
                  </label>
                </div>
              ))}
            </div>


<div className="ml-30 text-base font-semibold mt-5">
  <label className="block font-bold text-xl text-green-800" htmlFor="file">
    Event Image
  </label>
  <input
    type="file"
    id="file"
    name="file"
    accept="image/*"
    onChange={(e) => setFile(e.target.files[0])}
    className="w-full p-2 border border-gray-200 rounded-lg text-lg font-lexend focus:outline-none focus:ring-2 focus:ring-green-500"
  />
</div>


            {/* Display total cost */}
            <div className="ml-30 text-base font-semibold mt-5">
              <p>Total Cost: {totalCost} LKR</p>
            </div>



      <center>
        <br />
        <button className="bg-green-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950 " type="submit" name="submit" id="submit">
          Submit
        </button>
      </center>
    </form>
  </div>
</div>
</div>


  );
}

