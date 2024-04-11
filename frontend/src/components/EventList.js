import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'; // Import useSelector
import bggreen from '../assets/bggreen.jpg'; // Import the image
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ConfirmDeletion from './ConfirmDeletion'; // Import the modal component
import CustomPopup from './CustomPopup'; // Import the modal component
import EventHeader from './EventHeader';

export default function EventList() {

  const [allEvents, setEvents] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'

  const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`

  const navigate = useNavigate();

  useEffect(() => {
    function getEvents() {
      axios.get("http://localhost:5000/event/getAllEvents")
      .then((res) => {
        setEvents(res.data);
        // const publicEvents = res.data.filter(event => event.isPublic === true); // Filter only public events
        // setEvents(publicEvents);
      }).catch((err) => {
        alert(err.message);
      });
    }

    getEvents();
  }, []);


  const handleDeleteClick = (eventId) => {
    setSelectedEventId(eventId); // Set the option ID to state
    setIsModalOpen(true); // Show the modal
  };
  

  const confirmDelete = async () => {
    if (selectedEventId) {
      try {
        await axios.delete(`http://localhost:5000/event/deleteEvent/${selectedEventId}`);
        setIsModalOpen(false); // Close the modal
        // Custom success notification
        setPopupMessage("Event Deleted Successfully!");
        setPopupType('info');
        setIsPopupOpen(true);
        setEvents(allEvents.filter(event => event._id !== selectedEventId)); // Update state to remove the item
      } catch (error) {
        console.error("Error deleting event:", error.message);
        // Custom error notification
        setPopupMessage("Error deleting event. Please try again.");
        setPopupType('error');
        setIsPopupOpen(true);
      }
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
      {/* Call Header */}
    <EventHeader/>
   

            
  
      {/* Your scrolling content */}
      {/* {allEvents && allEvents.map((event) => ( */}


      {/* Cards for each Event */}
      <div className=" px-8 pb-3 justify-between grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-x-6  w-full ">
          {/* Cards for this category */}
          {allEvents.filter(event => event.isPublic === true).map((event) => (
                  <div key={event._id} className="container bg-fixed my-3 max-w-5xl mx-auto p-5 bg-white bg-opacity-50 shadow-2xl shadow-theme-green rounded-3xl overflow-auto border-2 border-green-700">
                    <div className="grid  grid-cols-2 gap-9 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                      <div className="container shadow-md rounded-3xl overflow-hidden w-full max-h-64">
                          <img className="w-full h-full object-fill mt-3" src={`http://localhost:5000/Images/${event.eventImage}`} alt="Event" />
                      </div>
        <div className="px-0 py-4">
            {/* Event Name with Inika font */}
            <h1 className="text-xl font-bold text-green-800 font-inika">{event.eventName}</h1>
            
            {/* Event Date with Lexend font */}
            <h6 className="text-xs text-gray-600 font-lexend">Ella Jungle Resort</h6>
            

            <div className="flex justify-between">
              <p className="text-base font-bold text-blue-600">{event.eventDate ? event.eventDate.substr(0, 10) : ""}</p>
              <p className="text-base font-bold text-green-600 pr-9">{event.eventTime}</p>
            </div>
            
  
            {/* Event Description with McLaren font */}
            <div className=" mt-1 max-h-24">
              <p className="text-sm font-mclaren">{event.eventDescription}</p>
            </div>
  
            <div className="mt-6 flex justify-center items-center">

            <div className="mt-0 flex justify-center items-center">
             {/* Using Link component for View button */}
              <Link to={`/buyEventTicket/${event._id}`} className=" mr-5 text-white text-sm font-mclaren px-4 py-1 bg-blue-500 hover:bg-blue-800    rounded-3xl"> Buy Ticket</Link>   
            </div>

            {/* Using Link component for View button */}
              <Link to={`/viewEvent/${event._id}`} className=" text-white text-sm font-mclaren px-10 py-1  bg-theme-green hover:bg-green-800 rounded-3xl"> View </Link>

            </div>
                      
        </div>  
                      </div>
                  </div>
              ))}
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
          }}
          type={popupType}
        />
    
    </div>
     {/* Content Wrapper Ends Here*/}
  </div>
  )
}


