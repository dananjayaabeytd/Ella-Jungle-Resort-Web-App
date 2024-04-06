import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'; // Import useSelector
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.
import bggreen from '../assets/bggreen.jpg'; // Import the image
import CustomPopup from './CustomPopup'; // Import the modal component
import EventHeader from './EventHeader';

export default function UpdateEvent() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updatedEventName, setUpdatedEventName] = useState("");
  const [updatedEventCategory, setUpdatedEventCategory] = useState("");
  const [updatedEventDate, setUpdatedEventDate] = useState("");
  const [updatedEventDescription, setUpdatedEventDescription] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [totalCost, setTotalCost] = useState(0); // Total cost state
  const [file, setFile] = useState(null);

  const [formError, setFormError] = useState("");

  const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`

  const navigate = useNavigate();

  const { eventId } = useParams(); // Get the eventId from URL params
  const [allOptions, setAllOptions] = useState([]);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'

  
  useEffect(() => {
    // Fetch all options when the component mounts
    function getOptions() {
      axios.get("http://localhost:5000/option/allOptions")
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
        const response = await axios.get(`http://localhost:5000/event/getSelectedEvent/${eventId}`);
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


    // Check if all fields are filled
    if (!updatedEventName || !updatedEventCategory || !updatedEventDate || !updatedEventDescription || selectedOptions.length === 0) {
      setFormError("Please Fill All ");
      return;
    }

    // Check if Event Name exceeds 10 words
    if (!validateEventName(updatedEventName)) {
      setFormError("Event Name Should Not Exceed 10 Words");
      return;
    }
    
    // Check if user has selected at least 3 options
    if (selectedOptions.length < 3) {
      setFormError("Please Select at least Three Options");
      return;
    }



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
      await axios.put(`http://localhost:5000/event/updateEvent/${eventId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });


      // Custom success notification
      setPopupMessage("Event details updated successfully!");
      setPopupType('info');
      setIsPopupOpen(true);


    } catch (error) {
      console.error("Error updating event details:", error.message);
      // Custom success notification
      setPopupMessage("Error updating event details. Please try again.");
      setPopupType('error');
      setIsPopupOpen(true);
    }
  };

  
  // Function to get today's date in the format required by input type="date"
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
  
    // Pad month and day with leading zero if needed
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
  
    return `${year}-${month}-${day}`;
  };


  
  // Function to validate event name
  const validateEventName = (name) => {
    const words = name.split(' ').filter(word => word !== ''); // Split by spaces and remove empty strings
    if (words.length > 10) {
      return false;
    }
    return true;
  };


  if (!selectedEvent) {
    return <div>Loading...</div>;
  }


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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">

        <div className="container my-10 max-w-4xl mx-auto p-10 bg-gray-200 opacity-75 shadow-2xl shadow-green-400 rounded-[50px] overflow-auto font-lexend border-8 border-double border-theme-green">
          <div className="text-5xl font-extrabold ... bg-clip-text text-transparent bg-gradient-to-r from-theme-green to-green-800 ">    
              Update Event
          </div>

          <form className="mt-3" encType="multipart/form-data" onSubmit={handleUpdate}>

            {/* Event Name */}
            <div className="ml-30 text-base font-semibold mt-5 ">
              <label className="block font-bold text-xl text-green-700" htmlFor="eventName">Event Name</label>
              <input type="text" placeholder="Enter Name" name="eventName" required value={updatedEventName}
                className="w-full p-1  rounded text-lg font-lexend form-check border-2 border-theme-green"
                onChange={(e) => {
                  setUpdatedEventName(e.target.value);
                  if (formError) {
                    setFormError("");
                  }
                }}
              />
            </div>


            {/* Event Category */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-700" htmlFor="eventCategory">Event Category</label>
              <select placeholder="Select Category" name="eventCategory" id="eventCategory" value={updatedEventCategory}
                className="w-full p-1  rounded text-lg font-lexend form-check border-2 border-theme-green"
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
                <label className="block font-bold text-xl text-green-700" htmlFor="eventDate">Event Date</label>
                <input type="date" placeholder="Event Date" name="eventDate" required value={updatedEventDate}
                    min={getCurrentDate()} // Set the min attribute to today's date
                    className="w-full p-1 border-2 border-theme-green rounded text-lg font-lexend form-check"
                    onChange={(e) => setUpdatedEventDate(e.target.value)}
                />
            </div>

            {/* Event Description */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="eventDescription">Event Description</label>
              <textarea cols="50" rows="8" placeholder="Enter Description" name="eventDescription"
                value={updatedEventDescription}
                className="h-24 w-full p-1 border-2 border-theme-green rounded text-lg font-lexend"
                onChange={(e) => setUpdatedEventDescription(e.target.value)}
              ></textarea>
            </div>



            {/* Event Options */}
            <div className="lg:pl-2 lg:pr-0 sm:px-20 pt-0 grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                
                {categories.map((category, index) => (
                  <div key={index} className="text-base font-semibold ml-16">
                    {/* Category Title */}
                    <p className="mt-5 mb-1 text-lg font-bold text-green-700">{category} Options:-</p>
                    {/* Options for this category */}
                    {allOptions.filter((option) => option.optionCategory === category).map((option) => (
                        <div key={option._id} className="form-check">
                          <input
                            type="checkbox"
                            id={option._id}
                            name={option.optionName}
                            checked={selectedOptions.includes(option._id)}
                            onChange={(e) => handleOptionChange(option._id, e.target.checked)}
                            className="form-checkbox h-5 w-5 text-green-600 "
                          />
                          <label htmlFor={option._id} className="ml-2 text-black">
                            {option.optionName} - {option.optionPrice} LKR
                          </label>
                        </div>
                      ))}
                  </div>
                ))}
              </div>



            {/* Display total cost */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-black">Total Cost: {totalCost} LKR</label>
            </div>



            {/* Image Upload */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-700" htmlFor="file">
                Event Image
              </label>
              <input type="file" id="file" name="file" accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full p-2 border-2 border-theme-green rounded-lg text-lg font-lexend focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            
            {/* Display form errors */}
            {formError && (
              <div className="ml-30  text-xl font-inika mt-3 text-red-600">
                <p>{formError}</p>
              </div>
            )}



            <div className="flex justify-center mt-5">
              <button className="bg-green-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950" type="submit" name="submit" id="submit"> Update Event </button>

              <Link to={`/viewEvent/${eventId}`} className="ml-5 bg-red-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-red-400 hover:border-red-950" type="button"   > Cancel </Link>
            </div>
          </form>
        </div>

        {/* Your component structure */}
      <CustomPopup
          isOpen={isPopupOpen}
          message={popupMessage}
          onClose={() => {
            setIsPopupOpen(false);
            navigate(`/viewEvent/${eventId}`);
          }}
          type={popupType}
        />
      </div>
    </div>
  );
}
