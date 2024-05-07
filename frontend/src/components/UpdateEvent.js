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
  const [updatedEventTime, setUpdatedEventTime] = useState("");
  const [updatedEventDescription, setUpdatedEventDescription] = useState("");
  const [updatedAttendeeCount, setUpdatedAttendeeCount] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [totalCost, setTotalCost] = useState(""); // Total cost state
  const [isPublic, setIsPublic] = useState(false); // Total cost state
  const [ticketPrice, setTicketPrice] = useState(""); // Total cost state
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [reservedSlots, setReservedSlots] = useState([]);
  
  
  const [file, setFile] = useState(null);

  const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`

  const [formError, setFormError] = useState("");
  
  const timeSlots = [
    { id: 'slot1', label: '8am to 12pm', value: '08:00-12:00' },
    { id: 'slot2', label: '12pm to 4pm', value: '12:00-16:00' },
    { id: 'slot3', label: '4pm to 8pm', value: '16:00-20:00' },
    { id: 'slot4', label: '8pm to 12am', value: '20:00-00:00' },
  ];

  // Get current date and time
  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


  

  const navigate = useNavigate();

  const { eventId } = useParams(); // Get the eventId from URL params
  const [allOptions, setAllOptions] = useState([]);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'

  const [showDescription, setShowDescription] = useState(null);

  
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


  
  const handleTimeSlotChange = (slotId) => {
    if (selectedTimeSlots.includes(slotId)) {
      setSelectedTimeSlots(prev => prev.filter(id => id !== slotId));
    } else {
      setSelectedTimeSlots(prev => [...prev, slotId]);
    }
  };


  
 // Fetch reserved slots for the selected date
 useEffect(() => {
  const fetchReservedSlots = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/event/reservedSlots/${updatedEventDate}`);
      setReservedSlots(response.data.reservedSlots);
    } catch (error) {
      console.error("Error fetching reserved slots:", error.message);
    }
  };

  if (updatedEventDate) {
    fetchReservedSlots();
  }
}, [updatedEventDate]);





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
      setUpdatedEventTime(selectedEvent.eventTime || ""); // Preload eventTime
      setUpdatedEventDescription(selectedEvent.eventDescription || "");
      setUpdatedAttendeeCount(selectedEvent.attendeeCount || "");
      setTotalCost(selectedEvent.totalCost || null);
      setIsPublic(selectedEvent.isPublic || false);
      setTicketPrice(selectedEvent.ticketPrice || "");
      setSelectedOptions(selectedEvent.selectedOptions || [].map(id => id.toString()));
      setSelectedTimeSlots(selectedEvent.selectedTimeSlots || []);
    }
  }, [selectedEvent]);


  
  // Function to calculate total cost
  const calculateTotalCost = () => {
    let cost = 0;
    selectedOptions.forEach((optionId) => {
      const selectedOption = allOptions.find(option => option._id === optionId);
      if (selectedOption) {
        // Multiply perPerson optionPrice by attendeeCount if it's a perPerson option
        const optionCost = selectedOption.perPerson ? selectedOption.optionPrice * updatedAttendeeCount : selectedOption.optionPrice;
        cost += optionCost;
      }
    });

    
    // Add additional cost for each selected time slot
    const timeSlotCost = selectedTimeSlots.length * 1000; // Assuming 1000 LKR per slot
    cost += timeSlotCost;


    return cost;
  };


  
  // Calculate total cost whenever selected options, selected time slots, or attendee count change
  useEffect(() => {
    const cost = calculateTotalCost();
    setTotalCost(cost);
  }, [selectedOptions, allOptions, selectedTimeSlots, updatedAttendeeCount]);




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


    // Check if user has selected at least 3 options
    if (updatedAttendeeCount < 10) {
      setFormError("Expected attendees count should not be less than 10");
      return;
    }


    const formData = new FormData();
    formData.append("eventName", updatedEventName);
    formData.append("eventCategory", updatedEventCategory);
    formData.append("eventDate", updatedEventDate);
    formData.append("eventTime", updatedEventTime);
    formData.append("eventDescription", updatedEventDescription);
    formData.append("attendeeCount", updatedAttendeeCount);
    formData.append("totalCost", totalCost);
    formData.append("isPublic", isPublic);
    formData.append("ticketPrice", ticketPrice);
    formData.append("file", file);
    formData.append("eventBookingDate", currentDate);
    formData.append("eventBookingTime", formattedTime);

    
  // Append selected option IDs
  selectedOptions.forEach((optionId) => {
    formData.append("selectedOptions[]", optionId);
  });

  
    // Append selected time slots excluding reserved slots, unless they belong to the current event
    const selectedTimeSlotsToAppend = selectedTimeSlots.filter(slotId =>
      !reservedSlots.includes(slotId) || selectedEvent.selectedTimeSlots.includes(slotId)
    );

   // Append filtered selected time slots
    selectedTimeSlotsToAppend.forEach(slotId => {
      formData.append("selectedTimeSlots[]", slotId);
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

        <div className="container my-10 max-w-4xl mx-auto p-10 bg-secondary-green opacity-80 shadow-2xl shadow-green-400 rounded-[50px] overflow-auto font-lexend border border-theme-green">
          <div className="text-5xl font-extrabold ... bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-black justify-center ">    
              Update Event
          </div>

          <form className="mt-3" encType="multipart/form-data" onSubmit={handleUpdate}>

            {/* Event Name */}
            <div className="px-12 text-base font-semibold mt-5 ">
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
            <div className="px-12 text-base font-semibold mt-5">
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

            <div className="flex">
            <div className="px-12 ">
              {/* Event Date */}
              <div className="text-base font-semibold mt-5">
                  <label className="block font-bold text-xl text-green-700" htmlFor="eventDate">Event Date</label>
                  <input type="date" placeholder="Event Date" name="eventDate" required value={updatedEventDate}
                      min={getCurrentDate()} // Set the min attribute to today's date
                      className="w-full p-1 border-2 border-theme-green rounded text-lg font-lexend form-check"
                      onChange={(e) => setUpdatedEventDate(e.target.value)}
                  />
              </div>

              {/* Event Time */}
              <div className=" text-base font-semibold mt-5">
                  <label className="block font-bold text-xl text-green-800" htmlFor="eventTime">Event Time</label>
                  <input type="time" placeholder="Event Time" name="eventTime" required value={updatedEventTime}
                      min={getCurrentDate()} // Set the min attribute to today's date
                      className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                      onChange={(e) => setUpdatedEventTime(e.target.value)}
                  />
              </div>
              </div>

              <div className="pl-40 text-base font-semibold mt-5">
                <p className="block font-bold text-xl text-green-800 mb-3">Select Time Slots:</p>
                {timeSlots.map(slot => (
                  <div key={slot.id} className="flex mt-2">
                    <input
                      type="checkbox"
                      id={slot.id}
                      disabled={reservedSlots.includes(slot.id) && !selectedEvent.selectedTimeSlots.includes(slot.id)}
                      checked={selectedTimeSlots.includes(slot.id)}
                      onChange={() => handleTimeSlotChange(slot.id)}
                      className="form-checkbox h-5 w-5 text-green-600"
                    />
                    <label htmlFor={slot.id} className="ml-2 text-black">{slot.label}</label>
                    {reservedSlots.includes(slot.id) && !selectedEvent.selectedTimeSlots.includes(slot.id) && (
                      <span className="ml-2 text-red-600">This time slot is already reserved</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            
            




            {/* Event Description */}
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="eventDescription">Event Description</label>
              <textarea cols="50" rows="8" placeholder="Enter Description" name="eventDescription"
                value={updatedEventDescription}
                className="h-24 w-full p-1 border-2 border-theme-green rounded text-lg font-lexend"
                onChange={(e) => setUpdatedEventDescription(e.target.value)}
              ></textarea>
            </div>


            {/* Attendee Count*/}
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="updatedAttendeeCount">Attendee Count</label>
              <input type="number" placeholder="Enter Attendee Count" name="updatedAttendeeCount" required value={updatedAttendeeCount}
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                onChange={(e) => setUpdatedAttendeeCount(e.target.value)}
              />
            </div>



            {/* Event Options */}
<div className="lg:pl-2 lg:pr-0 sm:px-20 pt-0 grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
  {categories.map((category, index) => (
    <div key={index} className="text-base font-semibold ml-16">
      {/* Category Title */}
      <p className="mt-5 mb-1 text-lg font-bold text-green-900">{category} Options:-</p>
      {/* Options for this category */}
      {allOptions.filter((option) => option.optionCategory === category).map((option) => (
        <div key={option._id} className="form-check flex items-center">
          <input
            type="checkbox"
            id={option._id}
            name={option.optionName}
            checked={selectedOptions.includes(option._id)}
            onChange={(e) => handleOptionChange(option._id, e.target.checked)}
            className="form-checkbox h-5 w-5 text-green-600"
          />
          <label
            htmlFor={option._id}
            className="ml-2 text-black cursor-pointer relative"
            onMouseEnter={() => setShowDescription(option._id)}
            onMouseLeave={() => setShowDescription(null)}
          >
            {option.optionName} - {option.optionPrice} LKR
            {/* Tooltip */}
            {showDescription === option._id && (
              <div className="absolute z-10 -top-10 left-36 font-lexend bg-green-600 text-white text-xs rounded shadow p-1 w-48">
                {option.optionDescription}
              </div>
            )}
          </label>
        </div>
      ))}
    </div>
  ))}
</div>



            {/* Display total cost */}
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-black">Total Cost: {totalCost} LKR</label>
            </div>


                        {/* Is Public? */}
                        <div className="lg:pl-2 lg:pr-0 sm:px-20 pt-4 grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 ">
                <div className="text-base font-semibold ml-16">
                    <div>
                        <label htmlFor="public" className="flex items-center">
                            <input
                                type="radio"
                                id="public"
                                name="isPublic"
                                value="true"
                                checked={isPublic === true}
                                onChange={() => setIsPublic(true)}
                                className="form-radio h-5 w-5 text-green-600"
                            />
                            <span className="ml-2 text-black">Public - The event will be published for all users.</span>
                        </label>
                        <p></p>
                    </div>

                    <div>
                        <label htmlFor="private" className="flex items-center">
                            <input
                                type="radio"
                                id="private"
                                name="isPublic"
                                value="false"
                                checked={isPublic === false}
                                onChange={() => setIsPublic(false)}
                                className="form-radio h-5 w-5 text-green-600"
                            />
                            <span className="ml-2 text-black">Private - The event will not be published.</span>
                        </label>

                    
                    
            {/* Ticket Price - Only displayed if isPublic is true */}
              {isPublic === true && (
                  <div className="text-base font-semibold mt-4 flex justify">
                      <label className="block font-bold text-xl text-green-800 " htmlFor="ticketPrice">Ticket Price : </label>
                      <input required className=" p-1 ml-4 border border-gray-200 rounded text-lg font-lexend form-check"
                          type="number" placeholder="Enter Price" name="ticketPrice" value={ticketPrice}
                          onChange={(e) => setTicketPrice(e.target.value)}
                          
                      />
                      <label className="block font-bold text-xl text-green-800 felx" htmlFor="ticketPrice">LKR</label>
                  </div>
              )}    
                    </div>
                </div>
            </div>



            {/* Image Upload */}
            <div className="px-12 text-base font-semibold mt-5">
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
              <button className="flex justify-center bg-green-700 text-white text-lg px-3 py-2 border border-green-800 rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950" type="submit" name="submit" id="submit"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>Update </button>

              <Link to={`/viewEvent/${eventId}`} className="ml-16 flex justify-center bg-red-700 text-white text-lg px-3 py-2 border border-red-800 rounded-full cursor-pointer font-bold hover:bg-red-400 hover:border-red-950" type="button"   >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg> Cancel </Link>
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
