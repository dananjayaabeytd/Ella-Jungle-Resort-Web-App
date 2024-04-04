import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.
import bggreen from '../assets/bggreen.jpg'; // Import the image

export default function UpdateEvent() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updatedEventName, setUpdatedEventName] = useState("");
  const [updatedEventCategory, setUpdatedEventCategory] = useState("");
  const [updatedEventDate, setUpdatedEventDate] = useState("");
  const [updatedEventDescription, setUpdatedEventDescription] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [totalCost, setTotalCost] = useState(0); // Total cost state
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const { eventId } = useParams(); // Get the eventId from URL params
  const [allOptions, setAllOptions] = useState([]);
  
  useEffect(() => {
    // Fetch all options when the component mounts
    function getOptions() {
      axios.get("http://localhost:8070/option/allOptions")
        .then((res) => {
          setAllOptions(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getOptions();
  }, []);


  function handleOptionChange(optionId, checked) {
    if (checked) {
      setSelectedOptions(prevSelectedOptions => [...prevSelectedOptions, optionId]);
      
    } else {
      setSelectedOptions(prevSelectedOptions => prevSelectedOptions.filter(id => id !== optionId));
    }
  }




  useEffect(() => {
    // Fetch event data based on eventId when the component mounts
    async function getEventDetails() {
      try {
        const response = await axios.get(`http://localhost:8070/event/get/${eventId}`);
        setSelectedEvent(response.data.event);
        console.log("Fetched Event Details Successfully");


        const eventSelectedOptions = response.data.event.selectedOptions || [];
        setSelectedOptions(eventSelectedOptions.map(id => id.toString())); // Ensuring IDs are strings for comparison

       
      } catch (error) {
        console.error("Error fetching event data:", error.message);
        alert("Error fetching event data. Please try again.");
      }
    }

    getEventDetails();
  }, [eventId]);

  

  useEffect(() => {
    if (selectedEvent) {
      setUpdatedEventName(selectedEvent.eventName || "");
      setUpdatedEventCategory(selectedEvent.eventCategory || "");
      setUpdatedEventDate(selectedEvent.eventDate ? selectedEvent.eventDate.substr(0, 10) : "");
      setUpdatedEventDescription(selectedEvent.eventDescription || "");
      setTotalCost(selectedEvent.totalCost || 0);
      setSelectedOptions(selectedEvent.selectedOptions || [].map(id => id.toString()));
    }
  }, [selectedEvent]);


  
  
  // Function to calculate total cost
  const calculateTotalCost = () => {
    let cost = 0;
    selectedOptions.forEach((optionId) => {
      const selectedOption = allOptions.find(option => option._id === optionId);
      if (selectedOption) {
        cost += selectedOption.optionPrice;
      }
    });
    return cost;
  };


  
  // Calculate total cost whenever selected options change
  useEffect(() => {
    const cost = calculateTotalCost();
    setTotalCost(cost);
  }, [selectedOptions, allOptions]);




  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const formData = new FormData();
    formData.append("eventName", updatedEventName);
    formData.append("eventCategory", updatedEventCategory);
    formData.append("eventDate", updatedEventDate);
    formData.append("eventDescription", updatedEventDescription);
    formData.append("totalCost", totalCost);
    formData.append("file", file);

    
  // Append selected option IDs
  selectedOptions.forEach((optionId) => {
    formData.append("selectedOptions[]", optionId);
  });

    try {
      await axios.put(`http://localhost:8070/event/update/${eventId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Event details updated successfully!");
      navigate("/");
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
              <input type="text" id="eventName" name="eventName" value={updatedEventName}
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                onChange={(e) => setUpdatedEventName(e.target.value)}
              />
            </div>

            {/* Event Category */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="eventCategory">Event Category</label>
              <select placeholder="Select Category" name="eventCategory" id="eventCategory" value={updatedEventCategory}
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                onChange={(e) => setUpdatedEventCategory(e.target.value)}
              >
                <option value="" disabled>Select Category</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Christmas">Christmas</option>
                <option value="Halloween">Halloween</option>
                <option value="NewYear">New Year</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Event Date */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="eventDate">Event Date</label>
              <input type="date" id="eventDate" name="eventDate" value={updatedEventDate}
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                onChange={(e) => setUpdatedEventDate(e.target.value)}
              />
            </div>

            {/* Event Description */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="eventDescription">Event Description</label>
              <textarea cols="50" rows="8" placeholder="Enter Description" name="eventDescription"
                value={updatedEventDescription}
                className="h-24 w-full p-1 border border-gray-200 rounded text-lg font-lexend"
                onChange={(e) => setUpdatedEventDescription(e.target.value)}
              ></textarea>
            </div>



            {/* Decoration Preferences */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800">Decoration Preferences:</label>
              {allOptions && allOptions.filter((option) => option.optionCategory === "Decoration").map((option) => (
                <div key={option._id} className="form-check">
                  <input type="checkbox" id={option._id} name={option.optionName} checked={selectedOptions.includes(option._id)}
                    onChange={(e) => handleOptionChange(option._id, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-green-600" 
                  />
                  <label htmlFor={option._id} className="ml-2 text-green-800">
                    {option.optionName} - {option.optionPrice}  LKR
                  </label>
                </div>
              ))}
            </div>

            {/* Catering Preferences */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800">Catering Preferences:</label>

              {allOptions && allOptions.filter((option) => option.optionCategory === "Catering").map((option) => (
                <div key={option._id} className="form-check">
                  <input type="checkbox" id={option._id} name={option.optionName}
                    checked={selectedOptions.includes(option._id)}
                    onChange={(e) => handleOptionChange(option._id, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <label htmlFor={option._id} className="ml-2 text-green-800">
                    {option.optionName} - {option.optionPrice} LKR
                  </label>
                </div>
              ))}
            </div>



            {/* Entertainment Preferences */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800">Entertainment Preferences:</label>

              {allOptions && allOptions.filter((option) => option.optionCategory === "Entertainment").map((option) => (
                <div key={option._id} className="form-check">
                  <input type="checkbox" id={option._id} name={option.optionName}
                    checked={selectedOptions.includes(option._id)}
                    onChange={(e) => handleOptionChange(option._id, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <label htmlFor={option._id} className="ml-2 text-green-800">
                    {option.optionName} - {option.optionPrice} LKR
                  </label>
                </div>
              ))}
            </div>


            
            {/* Parking Preferences */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800">Parking Preferences:</label>

              {allOptions && allOptions.filter((option) => option.optionCategory === "Parking").map((option) => (
                <div key={option._id} className="form-check">
                  <input type="checkbox" id={option._id} name={option.optionName}
                    checked={selectedOptions.includes(option._id)}
                    onChange={(e) => handleOptionChange(option._id, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <label htmlFor={option._id} className="ml-2 text-green-800">
                    {option.optionName} - {option.optionPrice} LKR
                  </label>
                </div>
              ))}
            </div>


            
            {/* Photography Preferences */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800">Photography Preferences:</label>

              {allOptions && allOptions.filter((option) => option.optionCategory === "Photography").map((option) => (
                <div key={option._id} className="form-check">
                  <input type="checkbox" id={option._id} name={option.optionName}
                    checked={selectedOptions.includes(option._id)}
                    onChange={(e) => handleOptionChange(option._id, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <label htmlFor={option._id} className="ml-2 text-green-800">
                    {option.optionName} - {option.optionPrice} LKR
                  </label>
                </div>
              ))}
            </div>


            {/* Display total cost */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-black">Total Cost: {totalCost} LKR</label>
            </div>



            {/* Image Upload */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="file">
                Event Image
              </label>
              <input type="file" id="file" name="file" accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full p-2 border border-gray-200 rounded-lg text-lg font-lexend focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex justify-center mt-5">
              <button className="bg-green-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950" type="submit" name="submit" id="submit"> Update Event </button>

              <Link to={`/events`} className="ml-5 bg-red-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-red-400 hover:border-red-950" type="button"   > Cancel </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
