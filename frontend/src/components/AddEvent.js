import React, { useState, useEffect } from "react";
import bggreen from '../assets/bggreen.jpg'; // Import the image
import axios from "axios"; // axios for making HTTP requests
import { useSelector } from 'react-redux'; // Import useSelector
import { useNavigate } from 'react-router-dom'; // for programmatic navigation
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import CustomPopup from './CustomPopup'; // Import the modal component
import EventHeader from './EventHeader';

export default function AddEvent() {
  const [eventName, setEventName] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState(""); // State for ticket buying time
  const [eventDescription, setEventDescription] = useState("");
  const [totalCost, setTotalCost] = useState(""); // Total cost state
  const [attendeeCount, setAttendeeCount] = useState(""); // Total cost state
  const [isPublic, setIsPublic] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(""); // Tciket state 
  const [file, setFile] = useState(null);
  const [allOptions, setAllOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [reservedSlots, setReservedSlots] = useState([]);
  
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'
  
  const [showDescription, setShowDescription] = useState(null);

  const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`

  const [formError, setFormError] = useState("");

  const timeSlots = [
    { id: 'slot1', label: '8am to 12pm', value: '08:00-12:00' },
    { id: 'slot2', label: '12pm to 4pm', value: '12:00-16:00' },
    { id: 'slot3', label: '4pm to 8pm', value: '16:00-20:00' },
    { id: 'slot4', label: '8pm to 12am', value: '20:00-00:00' },
  ];
  

  const navigate = useNavigate();

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
      const response = await axios.get(`http://localhost:5000/event/reservedSlots/${eventDate}`);
      setReservedSlots(response.data.reservedSlots);
    } catch (error) {
      console.error("Error fetching reserved slots:", error.message);
    }
  };

  if (eventDate) {
    fetchReservedSlots();
  }
}, [eventDate]);


  
  
  // Function to calculate total cost
  const calculateTotalCost = () => {
    let cost = 0;
    selectedOptions.forEach((optionId) => {
      const selectedOption = allOptions.find(option => option._id === optionId);
      if (selectedOption) {
        // Multiply perPerson optionPrice by attendeeCount if it's a perPerson option
        const optionCost = selectedOption.perPerson ? selectedOption.optionPrice * attendeeCount : selectedOption.optionPrice;
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
  }, [selectedOptions, allOptions, selectedTimeSlots, attendeeCount]);


  // Function to handle form submission
  function sendData(e) {
    e.preventDefault();




    // Check if all fields are filled
    if (!eventName || !eventCategory || !eventDate || !eventDescription || attendeeCount == 0 || selectedOptions.length === 0) {
        setFormError("Please Fill all fields ");
        return;
      }

    // Check if Event Name exceeds 10 words
    if (!validateEventName(eventName)) {
        setFormError("Event Name Should Not Exceed 10 Words");
        return;
    }
    
    // Check if user has selected at least 3 options
    if (selectedOptions.length < 3) {
        setFormError("Please Select at least Three Options");
        return;
      }


       // Check if user has selected at least 3 options
    if (attendeeCount < 10) {
      setFormError("Expected attendees count should not be less than 10");
      return;
    }


    const formData = new FormData();
    formData.append("eventUserId", user._id); // Append user ID
    formData.append("eventName", eventName);
    formData.append("eventCategory", eventCategory);
    formData.append("eventDate", eventDate);
    formData.append("eventTime", eventTime);
    formData.append("eventDescription", eventDescription);
    formData.append("attendeeCount", attendeeCount);
    formData.append("totalCost", totalCost);
    formData.append("isPublic", isPublic);
    formData.append("ticketPrice", ticketPrice);
    formData.append("file", file);

    // Append selected option IDs
    selectedOptions.forEach((optionId) => {
      formData.append("selectedOptions[]", optionId);
    });

    // Append selected time slots excluding reserved slots
    const selectedTimeSlotsToAppend = selectedTimeSlots.filter(slotId => !reservedSlots.includes(slotId));

    // Append filtered selected time slots
    selectedTimeSlotsToAppend.forEach(slotId => {
      formData.append("selectedTimeSlots[]", slotId);
    });



    axios.post("http://localhost:5000/event/addEvent", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        // Custom success notification
        setPopupMessage("Event added successfully!");
        setPopupType('info');
        setIsPopupOpen(true);

        setEventName("");
        setEventCategory("");
        setEventDate("");
        setEventTime("");
        setSelectedTimeSlots([]);
        setEventDescription("");
        setSelectedOptions([]);
        setTotalCost(0);
        setIsPublic("");
        setTicketPrice(0);
        setFile(null);
        setFormError("");

      })
      .catch((err) => {
        alert(err);
        // Custom success notification
        setPopupMessage("Error adding event. Please try again.");
        setPopupType('error');
        setIsPopupOpen(true);
      });
  }

  // Get unique categories
  const categories = [...new Set(allOptions.map((option) => option.optionCategory))];


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

       
    {/* Call Header */}
    <EventHeader/>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="container my-10 max-w-4xl mx-auto p-10 bg-secondary-green shadow-2xl shadow-theme-green rounded-[50px] overflow-auto font-lexend opacity-80 border border-theme-green">
          <div className="text-5xl font-extrabold ...">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-black justify-center">
              Add Event
            </span>
          </div>
          
          <form className="mt-3" encType="multipart/form-data" onSubmit={sendData}>

            {/* Event Name */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="eventName">Event Name</label>
              <input type="text" placeholder="Enter Name" name="eventName" required value={eventName}
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                onChange={(e) => {
                  setEventName(e.target.value);
                  if (formError) {
                    setFormError("");
                  }
                }}
              />
            </div>

            

            {/* Event Category */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800"  htmlFor="eventCategory">Event Category</label>
              <select placeholder="Select Category" name="eventCategory" required id="eventCategory" value={eventCategory}
                onChange={(e) => setEventCategory(e.target.value)}
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
              >
                <option value="" disabled>Select Category</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Christmas">Christmas</option>
                <option value="Halloween">Halloween</option>
                <option value="NewYear">NewYear</option>
              </select>
            </div>

      <div className="flex ">
            {/* Event Date */}
            <div className="ml-30 text-base font-semibold mt-5">
                <label className="block font-bold text-xl text-green-800" htmlFor="eventDate">Event Date</label>
                <input type="date" placeholder="Event Date" name="eventDate" required value={eventDate}
                    min={getCurrentDate()} // Set the min attribute to today's date
                    className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                    onChange={(e) => setEventDate(e.target.value)}
                />
            </div>


            {/* Event Time */}
            <div className="pl-20 text-base font-semibold mt-5">
                <label className="block font-bold text-xl text-green-800" htmlFor="eventTime">Event Time</label>
                <input type="time" placeholder="Event Time" name="eventTime" required value={eventTime}
                    className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                    onChange={(e) => setEventTime(e.target.value)}
                />
            </div>

            </div>


            <div className="ml-30 text-base font-semibold mt-5">
              <p className="block font-bold text-xl text-green-800 mb-3">Select Time Slots:</p>
              {timeSlots.map(slot => (
                <div key={slot.id} className="flex mt-2">
                  <input
                    type="checkbox"
                    id={slot.id}
                    disabled={reservedSlots.includes(slot.id)}
                    checked={selectedTimeSlots.includes(slot.id)}
                    onChange={() => handleTimeSlotChange(slot.id)}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <label htmlFor={slot.id} className="ml-2 text-black">{slot.label}</label>
                  {reservedSlots.includes(slot.id) && (
              <span className="ml-2 text-red-600">This time slot is already reserved</span>
            )}
                </div>
              ))}
            </div>



            {/* Event Description */}    
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="eventDescription">Event Description</label>
              <textarea cols="50" rows="8" placeholder="Enter Description" name="eventDescription" required value={eventDescription}
                className="h-24 w-full p-1 border border-gray-200 rounded text-lg font-lexend"
                onChange={(e) => setEventDescription(e.target.value)}
              > 
              </textarea>
            </div>

            
            
            {/* Attendee Count*/}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="attendeeCount">Attendee Count</label>
              <input type="number" placeholder="Enter Attendee Count" name="attendeeCount" required value={attendeeCount}
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                onChange={(e) => setAttendeeCount(e.target.value)}
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


            <div className="ml-30 text-base font-semibold mt-5">
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
                  <div className="ml-30  text-base font-semibold mt-4 flex justify">
                      <label className="block font-bold text-xl text-green-800 " htmlFor="ticketPrice">Ticket Price</label>
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

            {/* Event Image */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="file">
                Event Image
              </label>
              <input type="file" id="file" name="file" accept="image/*" 
                className="w-full p-2 border border-gray-200 rounded-lg text-lg font-lexend focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            {/* Display form errors */}
            {formError && (
              <div className="ml-30 font-semibold text-xl font-lexend mt-3 text-red-600">
                <p>{formError}</p>
              </div>
            )}

            <div className="flex justify-center mt-5">
              <button className="bg-green-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950" type="submit" name="submit" id="submit"> Submit </button>

              <Link to={`/events`} className="ml-5 bg-red-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-red-400 hover:border-red-950" type="button"> Cancel </Link>
            </div>
          </form>
        </div>

        {/* Your component structure */}
      <CustomPopup
          isOpen={isPopupOpen}
          message={popupMessage}
          onClose={() => {
            setIsPopupOpen(false);
            navigate("/myEvents");
          }}
          type={popupType}
        />


      </div>
    </div>
  );
}
