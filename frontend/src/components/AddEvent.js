
import React, {useState} from 'react'
import bggreen from '../assets/bggreen.jpg'; // Import the image

import axios from "axios"   //axios for making HTTP requests
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.


function AddEvent() {
    
  const [eventName, setEventName] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");  
  const [minimalistChecked, setMinimalistChecked] = useState(false);
  const [elegantChecked, setElegantChecked] = useState(false);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();


  function sendData(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("eventName", eventName);
    formData.append("eventCategory", eventCategory);
    formData.append("eventDate", eventDate);
    formData.append("eventDescription", eventDescription);
    formData.append("file", file);
    // Append the decorationPreferences object with minimalistChecked and elegantChecked
    formData.append("decorationPreferences.minimalistChecked", minimalistChecked ? "true" : "false");
    formData.append("decorationPreferences.elegantChecked", elegantChecked ? "true" : "false");

    axios
      .post("http://localhost:8070/event/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Event Added");
        setEventName("");
        setEventCategory("");
        setEventDate("");
        setEventDescription("");
        setMinimalistChecked(false);
        setElegantChecked(false);
        setFile(null);
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
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
        Add Event
      </span>
    </div>
    
    <form className="mt-3" encType="multipart/form-data" onSubmit={sendData}>

      {/* Event Name */}
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-green-800" htmlFor="eventName">Event Name</label>
        <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
          type="text" placeholder="Enter Name" name="eventName" value={eventName}
          onChange={(e) => setEventName(e.target.value)}
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
          value={eventCategory}
          onChange={(e) => setEventCategory(e.target.value)}
        >
          <option value="" disabled>Select Category</option>
          <option value="Wedding">Wedding</option>
          <option value="Birthday">Birthday</option>
          <option value="Christmas">Christmas</option>
          <option value="Halloween">Halloween</option>
          <option value="NewYear">NewYear</option>
        </select>
      </div>


      {/* Event Date */}
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-green-800" htmlFor="eventDate">Event Date</label>
        <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
          type="date" placeholder="Event Date" name="eventDate" value={eventDate}
          onChange={(e) =>  setEventDate(e.target.value)}
        />
      </div>

      
      {/* Event Time */}
      {/*
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-green-800" htmlFor="eventTime">Event Time</label>
        <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
          type="time"
          placeholder="Event Time"
          name="eventTime"
        />
      </div>
      */}

      

      {/* Event Description */}
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-green-800" htmlFor="eventDescription">Event Description</label>
        <textarea className="h-24 w-full p-1 border border-gray-200 rounded text-lg font-lexend"
          cols="50" rows="8" placeholder="Enter Description" name="eventDescription" required value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        ></textarea>
      </div>

      
            {/* Decoration Preferences */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800">Decoration Preferences:</label>
              <div className="form-check">
                <input type="checkbox" id="minimalist" name="minimalist" checked={minimalistChecked}
                  onChange={(e) => setMinimalistChecked(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-green-600" 
                />
                <label htmlFor="minimalist" className="ml-2 text-green-800">
                  Minimalist
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" id="elegant" name="elegant" checked={elegantChecked} 
                  onChange={(e) => setElegantChecked(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
                <label htmlFor="elegant" className="ml-2 text-green-800">
                  Elegant
                </label>
              </div>
            </div>


      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-green-800" htmlFor="file">
          Event Image
        </label>
        <input type="file" id="file" name="file" accept="image/*" 
        onChange={(e) => setFile(e.target.files[0])} 
        className="w-full p-2 border border-gray-200 rounded-lg text-lg font-lexend focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>


      <center>
        <br />
        <button className="bg-green-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950 " type="submit" name="submit" id="submit">
          Submit
        </button>
      </center>
    </form>
  </div>
</div>
</div>


  );
}

export default AddEvent
