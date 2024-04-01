import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.
import bggreen from '../assets/bggreen.jpg'; // Import the image

export default function TestSecondary() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updatedEventName, setUpdatedEventName] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const { eventId } = useParams(); // Get the eventId from URL params

  // Assuming decorationPrices structure is the same from your AddEvent component
  const decorationPrices = {
    minimalist: 50,
    elegant: 100,
  };

  useEffect(() => {
    // Fetch event data based on eventId when the component mounts
    async function getEventDetails() {
      try {
        const response = await axios.get(`http://localhost:8070/event/get/${eventId}`);
        setSelectedEvent(response.data.event);
        console.log("Fetched Event Details Successfully");
        console.log(response.data.event);

        
      // Extract preferences marked as true and update state
      const preferences = response.data.event.decorationPreferences;
      const activePreferences = Object.entries(preferences)
        .filter(([key, value]) => value) // Filter out preferences that are true
        .map(([key]) => key); // Extract the preference keys
      setSelectedPreferences(activePreferences);
        
      } catch (error) {
        console.error("Error fetching event data:", error.message);
        alert("Error fetching event data. Please try again.");
      }
    }

    getEventDetails();
  }, [eventId]);


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



  useEffect(() => {
    if (selectedEvent) {
      setUpdatedEventName(selectedEvent.eventName || "");
    }
  }, [selectedEvent]);

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData();

    formData.append("eventName", updatedEventName);
    formData.append("file", file);


    // Append selected preferences to formData
    selectedPreferences.forEach((preference) => {
        formData.append(`decorationPreferences.${preference}`, "true");
      });

    try {
      await axios.put(`http://localhost:8070/event/update/${eventId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Event details updated successfully!");
      navigate("/");
      //window.location.href = '/'; // Redirect to home page after successful update
    } catch (error) {
      console.error("Error updating event details:", error.message);
      alert("Error updating event details. Please try again.");
    }
  };

  if (!selectedEvent) {
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

          <form className="mt-3" encType="multipart/form-data" onSubmit={handleUpdate}>

            {/* Event Name */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="eventName">Event Name</label>
              <input
                type="text"
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                id="eventName"
                name="eventName"
                value={updatedEventName}
                onChange={(e) => setUpdatedEventName(e.target.value)}
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
                    {preference.charAt(0).toUpperCase() + preference.slice(1)} (${price})
                  </label>
                </div>
              ))}
            </div>


            {/* Image Upload */}
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

            <div className="flex justify-center mt-5">
              <button className="bg-green-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950" type="submit" name="submit" id="submit">
                Update Event
              </button>

              <Link className="ml-5 bg-red-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-red-400 hover:border-red-950" type="button"  to={`/`} >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
