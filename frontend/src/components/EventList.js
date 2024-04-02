import React, { useState, useEffect } from "react";
import bggreen from '../assets/bggreen.jpg'; // Import the image
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import christmas1 from '../assets/christmas1.jpg';

import axios from "axios";

function EventList() {

  const [allEvents, setEvents] = useState([]);

  useEffect(() => {
    function getEvents() {
      axios.get("http://localhost:8070/event/")
      .then((res) => {
        setEvents(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }

    getEvents();
  }, []);


  const handleDeleteClick = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8070/event/delete/${eventId}`);
      alert("Event deleted successfully!");
      window.location.reload(); // Refresh the page after deletion
    } catch (error) {
      console.error("Error deleting event:", error.message);
      alert("Error deleting event. Please try again.");
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
   
    <ul>
      {allEvents && allEvents.map((event) => (
          <li key={event._id}>
            
  
      {/* Your scrolling content */}
      
      <div className="container bg-fixed my-5 max-w-5xl mx-auto p-5 bg-white bg-opacity-50 shadow-2xl shadow-theme-green rounded-3xl overflow-auto border-2 border-green-700">

      
  
      <div className="grid grid-cols-2 gap-16 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
    <div className="container shadow-md rounded-md overflow-hidden w-full max-h-80">
      <img className="product-image w-full h-full object-fill" src={`http://localhost:8070/Images/${event.eventImage}`} alt="Event Image"
      />
    </div>
        <div className="px-0 py-4">
            {/* Event Name with Inika font */}
            <h1 className="event-name text-3xl font-bold text-green-800 font-inika">{event.eventName}</h1>
            
            {/* Event Date with Lexend font */}
            <h6 className="Business_Name text-base text-gray-600 font-lexend">Ella Jungle Resort</h6>
            
            <div className="price mt-2">
              <div className="new-price text-xl font-bold text-blue-600">{event.eventDate ? event.eventDate.substr(0, 10) : ""}</div>
            </div>
  
            {/* Event Description with McLaren font */}
            <div className="p-des mt-2 max-h-24">
              <p className="Product-description text-base font-mclaren">{event.eventDescription}</p>
            </div>
  
            <div className="mt-4 flex justify-center items-center">


              {/* Using Link component for View button */}
              <Link to={`/update/${event._id}`} className=" text-white text-xl font-mclaren px-4 py-1  bg-theme-green hover:bg-green-800 rounded-3xl"> Update </Link>

              <button className="ml-5 text-white text-xl font-mclaren px-4 py-1  bg-blue-500 hover:bg-blue-800 rounded-3xl">
                View
              </button>

              <button className="ml-5 text-white text-xl font-mclaren px-4 py-1  bg-red-500 hover:bg-red-800 rounded-3xl" onClick={() => handleDeleteClick(event._id)}>
                Delete
              </button>
            </div>
                      
        </div>  
  
      </div>
        
    </div>
    {/* Scrolling content End*/}
  
        </li>
      ))}
    </ul>
      
    
    </div>
  </div>
  )
}

export default EventList
