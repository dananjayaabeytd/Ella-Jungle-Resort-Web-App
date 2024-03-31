import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import bggreen from '../assets/bggreen.jpg'; // Import the image

export default function TestPage() {

  const [selectedEvent, setSelectedEvent] = useState("");

  const { eventId } = useParams(); // Get the eventId from URL params

  useEffect(() => {
    // Fetch event data based on eventId when the component mounts
    async function getEventDetails() {
      try {
        const response = await axios.get(`http://localhost:8070/event/get/${eventId}`);
        setSelectedEvent(response.data.event);
        console.log("Fetched Event Details Successfully");
        console.log(response.data.event)
      } catch (error) {
        console.error("Error fetching event data:", error.message);
        alert("Error fetching event data. Please try again.");
      }
    }

    getEventDetails();
  }, [eventId]);

  const [updatedEventName, setUpdatedEventName] = useState("");
  const [updatedEventCategory, setUpdatedEventCategory] = useState("");
  const [updatedEventDate, setUpdatedEventDate] = useState("");
  const [updatedEventDescription, setUpdatedEventDescription] = useState("");

 
  console.log("UpdatedName: "+updatedEventName);

  // Update the updatedEventName, updatedEventCategory, updatedEventDate, updatedEventDescription
  // when selectedEvent changes
  useEffect(() => {
    if (selectedEvent) {
      setUpdatedEventName(selectedEvent.eventName || "");
      setUpdatedEventCategory(selectedEvent.eventCategory || "");
      setUpdatedEventDate(selectedEvent.eventDate || "");
      setUpdatedEventDescription(selectedEvent.eventDescription || "");
    }
  }, [selectedEvent]);

  console.log("SelectedEvent: "+selectedEvent);
  console.log("SelectedEventName: "+selectedEvent.eventName);

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      await axios.put(`http://localhost:8070/event/update/${eventId}`, {
        eventName: updatedEventName,
        eventCategory: updatedEventCategory,
        eventDate: updatedEventDate,
        eventDescription: updatedEventDescription,
      });

      alert("Event details updated successfully!");
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

          <form className="mt-3" onSubmit={handleUpdate}>

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

            {/* Event Category */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="eventCategory">Event Category</label>
              <select
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                placeholder="Select Category"
                name="eventCategory"
                id="eventCategory"
                value={updatedEventCategory}
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
              <input
                type="date"
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                id="eventDate"
                name="eventDate"
                value={updatedEventDate}
                onChange={(e) => setUpdatedEventDate(e.target.value)}
              />
            </div>

            {/* Event Description */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="eventDescription">Event Description</label>
              <textarea
                className="h-24 w-full p-1 border border-gray-200 rounded text-lg font-lexend"
                cols="50"
                rows="8"
                placeholder="Enter Description"
                name="eventDescription"
                value={updatedEventDescription}
                onChange={(e) => setUpdatedEventDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="flex justify-center mt-5">
              <button className="bg-green-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950" type="submit" name="submit" id="submit" onClick={() => window.location.href = '/'}>
                Update Event
              </button>
              <button className="ml-5 bg-red-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-red-400 hover:border-red-950" type="button" onClick={() => window.location.href = '/'}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}