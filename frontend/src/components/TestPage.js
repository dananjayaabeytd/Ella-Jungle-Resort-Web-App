import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector
import bggreen from '../assets/bggreen.jpg'; // Import the image

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ticket/allTickets');
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="flex flex-col items-center justify min-h-screen ">
         {/* Background Image */}
    <div
      className="absolute inset-0 z-0 bg-fixed"
      style={{
        backgroundImage: `url(${bggreen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    ></div>
      <h2 className="text-2xl font-bold text-green-800 mb-4">Ticket Details</h2>
      <div className="shadow-2xl shadow-theme-green rounded-3xl overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead className="font-bold text-left text-green-800 bg-green-100 rounded-t-3xl">
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200">Event ID</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">User ID</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">Email</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">Mobile</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">Count</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {user.isAdmin && tickets.map((ticket) => (
              <tr key={ticket._id} className="border-b border-gray-200 hover:bg-green-50">
                <td className="px-5 py-2">{ticket.eventId}</td>
                <td className="px-5 py-2">{ticket.ticketUserId}</td>
                <td className="px-5 py-2">{ticket.ticketUserEmail}</td>
                <td className="px-5 py-2">{ticket.ticketUserMobile}</td>
                <td className="px-5 py-2">{ticket.ticketCount}</td>
                <td className="px-5 py-2">{ticket.totalTicketCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketTable;
