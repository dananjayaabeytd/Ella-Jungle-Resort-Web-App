import React, { useState, useEffect } from "react";
import bggreen from '../assets/bggreen.jpg'; // Import the image

import axios from "axios"   //axios for making HTTP requests
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.

import { useSelector } from 'react-redux'; // Import useSelector
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import CustomPopup from './CustomPopup'; // Import the modal component
import EventHeader from './EventHeader';

export default function BuyEventTicket() {
    const { eventId } = useParams(); // Get the eventId from URL params

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [ticketUserEmail, setTicketUserEmail] = useState("");  
    const [ticketUserMobile, setTicketUserMobile] = useState("");  
    const [ticketCount, setTicketCount] = useState(1);  
    const [totalTicketCost, setTotalTicketCost] = useState("");  
        
  const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`

  const navigate = useNavigate();

  
  useEffect(() => {
    // Fetch event data based on eventId when the component mounts
    async function getEventDetails() {
      try {
        const response = await axios.get(`http://localhost:5000/event/getSelectedEvent/${eventId}`);
        setSelectedEvent(response.data.event);
        console.log("Fetched Event Details Successfully");
      } catch (error) {
        console.error("Error fetching event data:", error.message);
        alert("Error fetching event data. Please try again.");
      }
    }

    getEventDetails();
  }, [eventId]);

  

  const calculateTotalCost = () => {
    let cost = 0;
    
    if (selectedEvent) {
      cost = selectedEvent.ticketPrice * ticketCount;
    }
    
    return cost;
  };

  // Calculate total cost whenever ticket count or selectedEvent changes
  useEffect(() => {
    const cost = calculateTotalCost();
    setTotalTicketCost(cost);
  }, [ticketCount, selectedEvent]);


  
  function sendData(e) {
    e.preventDefault();

    //const formData = new FormData();

    const newTicket = {
        eventId,
        ticketUserId : user._id,
        ticketUserEmail,
        ticketUserMobile,
        ticketCount,
        totalTicketCost,
      }

      axios.post("http://localhost:5000/ticket/buyTicket", newTicket)
      .then(() => {
          alert("Ticket Bought");
        //Resetting inout fields
          setTicketUserEmail("");
          setTicketUserMobile("");
          setTicketCount("");
          setTotalTicketCost("");

          navigate(`/viewEvent/${eventId}`);
      }).catch((err) => {
          alert(err);
      })
  }

  useEffect(() => {
    if (user) {
        setTicketUserEmail(user.email || "");
        setTicketUserMobile(user.mobile || "");
        
    }
  }, [user]);


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

  <div className="container my-10 max-w-4xl mx-auto p-10 bg-secondary-green opacity-90 shadow-2xl shadow-green-400 rounded-[50px] overflow-auto font-lexend">
    <div className="text-5xl font-extrabold ...">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-black justify-center">
        Buy Ticket
      </span>
    </div>

    <form className="mt-3" onSubmit={sendData}>


      {/* User Email */}
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-green-800" htmlFor="ticketUserEmail">User Email</label>
        <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
          type="text" placeholder="Enter Email" name="ticketUserEmail" value={ticketUserEmail}
          onChange={(e) => setTicketUserEmail(e.target.value)}
        />
      </div>


      {/* User Mobile */}
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-green-800" htmlFor="ticketUserMobile">User Mobile</label>
        <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
          type="text" placeholder="Enter Mobile" name="ticketUserMobile" value={ticketUserMobile}
          onChange={(e) =>  setTicketUserMobile(e.target.value)}
        />
      </div>


      {/* Ticket Count */}
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-green-800" htmlFor="ticketCount">Ticket Count</label>
        <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
          type="number" placeholder="Enter Count" name="ticketCount" value={ticketCount}
          onChange={(e) =>  setTicketCount(e.target.value)}
        />
      </div>


      {/* Display total cost */}
      <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-black">Total Cost: {totalTicketCost} LKR</label>
            </div>



      <center>
        <br />
        <button className="bg-green-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950 " type="submit" name="submit" id="submit">
          Buy
        </button>
      </center>
    </form>
  </div>
</div>
</div>


  );
}

