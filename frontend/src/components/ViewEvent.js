import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import bggreen from '../assets/bggreen.jpg'; // Import the image
import ConfirmDeletion from './ConfirmDeletion'; // Import the modal component
import CustomPopup from './CustomPopup'; // Import the modal component

export default function ViewEvent() {

    const [selectedEvent, setSelectedEvent] = useState(null);
    const { eventId } = useParams(); // Get the eventId from URL params

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [allOptions, setAllOptions] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
 
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'


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

  

  const confirmDelete = async () => {
    if (selectedEventId) {
      try {
        await axios.delete(`http://localhost:5000/event/deleteEvent/${selectedEventId}`);
        alert("Event Deleted Successfully!");
        setIsModalOpen(false); // Close the modal
        // Custom success notification
        setPopupMessage("Event Deleted Successfully!");
        setPopupType('info');
        setIsPopupOpen(true);


      } catch (error) {
        console.error("Error deleting event:", error.message);
        // Custom success notification
        setPopupMessage("Error deleting event. Please try again!");
        setPopupType('error');
        setIsPopupOpen(true);
      }
    }
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
            
  
      {/* Your scrolling content */}
      
      <div className="container bg-fixed my-5 max-w-5xl mx-auto p-5  rounded-3xl overflow-auto bg-gray-50 bg-opacity-50 shadow-2xl shadow-theme-green border-8 border-double border-theme-green">

      
  
        <div className="lg:px-40 sm:px-10 pt-4 grid grid-cols-1 gap-10 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
            {/* Event Details */}
            <div className="container shadow-md rounded-3xl overflow-hidden w-full h-96 flex items-center justify-center">
                <img className="w-full h-full object-fill" src={`http://localhost:5000/Images/${selectedEvent.eventImage}`} 
                />
            </div>

            <div className="px-0 pb-0 pt-0">
                {/* Event Name with Inika font */}
                <h1 className="text-4xl font-bold text-green-800 font-inika text-center">{selectedEvent.eventName}</h1>
                
                {/* Event Date with Lexend font */}
                <h6 className="text-base text-gray-600 font-lexend text-center">Ella Jungle Resort</h6>
                
                <div className="price mt-2">
                <div className="text-2xl font-bold text-blue-600 text-center">{selectedEvent.eventDate ? selectedEvent.eventDate.substr(0, 10) : ""}</div>
                </div>
    
                {/* Event Description with McLaren font */}
                <div className="p-des mt-2 max-h-24">
                <p className="text-lg font-mclaren text-center">{selectedEvent.eventDescription}</p>
                </div>

            </div>

            {/*Options Loop*/}
            <div className="lg:pl-2 lg:pr-0 sm:px-20 pt-0 grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">             
              {categories.map((category, index) => (
                      <div key={index} className="text-base font-semibold ml-16">
                        {/* Category Title */}
                        <p className="mt-0 mb-1 block text-xl font-inika text-green-800">{category} Options:-</p>
                        {/* Options for this category */}
                        {allOptions.filter((option) => option.optionCategory === category).map((option) => (
                            <div key={option._id} className="form-check">
                              <input readOnly type="checkbox" id={option._id} name={option.optionName}
                                checked={selectedOptions.includes(option._id)}
                                className="form-checkbox h-5 w-5 appearance-none rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent checked:bg-theme-green checked:border-transparent checked:border-2"
                              />
                              <label htmlFor={option._id} className="ml-2 text-lg text-black">
                                {option.optionName}
                              </label>
                            </div>
                          ))}
                      </div>
                    ))}
            </div> 
            {/*Options Loop Ends Here*/}
            

            {/* Display total cost */}
            <div className="text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-black text-center">Total Cost: {selectedEvent.totalCost} LKR</label>
            </div>

        
        

            <div className="lg:px-40 sm:px-20 pb-5 grid grid-cols-1 gap-10 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                <div className="mt-0 flex justify-center items-center">
                    {/* Using Link component for View button */}
                    <Link to={`/updateEvent/${selectedEvent._id}`} className=" text-white text-xl font-mclaren px-4 py-1  bg-theme-green hover:bg-green-800 rounded-3xl"> Update </Link>

                    <button className="mx-28 text-white text-xl font-mclaren px-4 py-1  bg-blue-500 hover:bg-blue-800 rounded-3xl">
                        Buy
                    </button>

                    <button className=" text-white text-xl font-mclaren px-4 py-1  bg-red-500 hover:bg-red-800 rounded-3xl" 
                    onClick={() => {
                      setSelectedEventId(selectedEvent._id);
                      setIsModalOpen(true);
                    }}
                    >
                        Delete
                    </button>
                </div>
                      
            </div>  
  
        </div>
        
    </div>
    {/* Scrolling content End*/}

        
      {/* Use the Confirm Deletion Modal here */}
      <ConfirmDeletion
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* Your component structure */}
      <CustomPopup
          isOpen={isPopupOpen}
          message={popupMessage}
          onClose={() => {
            setIsPopupOpen(false);
            setIsModalOpen(false); // Close the modal
            navigate("/events");
          }}
          type={popupType}
        />
      
    
    </div>
  </div>
  )
}


