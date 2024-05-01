import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import bggreen from '../assets/bggreen.jpg';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import ConfirmDeletion from './ConfirmDeletion';
import CustomPopup from './CustomPopup';
import EventHeader from './EventHeader';

export default function EventList() {
  const [allEvents, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const user = useSelector(state => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    function getEvents() {
      axios.get("http://localhost:5000/event/getAllEvents")
      .then((res) => {
        setEvents(res.data);
        setSearchResults(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }

    getEvents();
  }, []);

  // Function to handle search query change
const handleSearchInputChange = (e) => {
  const query = e.target.value.toLowerCase();
  setSearchQuery(query);

  if (query.length > 0) {
    const filteredEvents = allEvents.filter(event =>
      event.eventName.toLowerCase().includes(query) ||
      event.eventDate.includes(query) ||
      event.eventCategory.toLowerCase().includes(query)
    );
    setSearchResults(filteredEvents);
  } else {
    setSearchResults(allEvents);
  }
};



  // Function to format event time to "hh:mm A" format
  const formatEventTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let parsedHours = parseInt(hours, 10);
    const suffix = parsedHours >= 12 ? "PM" : "AM";
    parsedHours = parsedHours % 12 || 12;
    return `${parsedHours}:${minutes} ${suffix}`;
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 z-0 bg-fixed"
        style={{
          backgroundImage: `url(${bggreen})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <EventHeader />

        {/* Search bar */}
<div className="mb-4 flex">
  <input
    type="text"
    placeholder="Search by name, date, or category..."
    value={searchQuery}
    onChange={handleSearchInputChange}
    className="border border-gray-400 px-4 py-2 rounded-l-lg "
  />
  <p className="bg-theme-green text-white px-4 py-2 rounded-r-lg font-mclaren">Search</p>
</div>


        {/* Event cards */}
        <div className="px-8 pb-3 justify-between grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-x-6  w-full ">
          {searchResults.map(event => (
            <div key={event._id} className="container bg-fixed my-3 max-w-5xl mx-auto p-5 bg-white bg-opacity-50 shadow-2xl shadow-theme-green rounded-3xl overflow-auto border-2 border-green-700">
              <div className="grid  grid-cols-2 gap-9 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                <div className="container shadow-md rounded-3xl overflow-hidden w-full max-h-64">
                  <img className="w-full h-full object-fill mt-3" src={`http://localhost:5000/Images/${event.eventImage}`} alt="Event" />
                </div>
                <div className="px-0 py-4">
                  <h1 className="text-xl font-bold text-green-800 font-inika">{event.eventName}</h1>
                  <h6 className="text-xs text-gray-600 font-lexend">Ella Jungle Resort</h6>
                  <div className="flex justify-between">
                    <p className="text-base font-bold text-blue-600">{event.eventDate ? event.eventDate.substr(0, 10) : ""}</p>
                    <p className="text-base font-bold text-green-600 pr-9">{formatEventTime(event.eventTime)}</p>
                  </div>
                  <div className=" mt-1 max-h-24">
                    <p className="text-sm font-mclaren">{event.eventDescription}</p>
                  </div>
                  <div className="mt-6 flex justify-center items-center">
                    <div className="mt-0 flex justify-center items-center">
                      <Link to={`/buyEventTicket/${event._id}`} className=" mr-5 text-white text-sm font-mclaren px-4 py-1 bg-blue-500 hover:bg-blue-800    rounded-3xl"> Buy Ticket</Link>
                    </div>
                    <Link to={`/viewEvent/${event._id}`} className=" text-white text-sm font-mclaren px-10 py-1  bg-theme-green hover:bg-green-800 rounded-3xl"> View </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
