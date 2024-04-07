//room info - custom
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardComponent_Custom_Summary from './custom.summary.card'; // Import the custom summary card component
import img from '../../../../assets/tour_landing.jpg';

const CardComponent_room = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); // State to store the selected room
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8081/Rooms/rooms/");
        setRooms(response.data);
      } catch (error) {
        setError(error.message); // Update state with the error message
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room); // Set the selected room when a room is selected
  };

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }

  return (
    <div>
      {rooms.map((room) => (
        <div key={room._id} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg mb-8 mx-4">
          <div className="flex items-center">
            <div className="w-1/3">
              <img src={img} alt="Image" className="w-full h-auto" />
            </div>
            <div className="w-2/3 p-4">
              <h3 className="text-xl font-bold mb-2">{room.roomName}</h3>
              <p className="text-lg text-gray-700 mb-4">
                Room Type : {room.roomType}<br/>
                Maximum count : {room.maxCount}<br/>
                Description : {room.description}<br />
                Rs.{room.price} per person<br />
              </p>
              <div className="flex justify-between">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleRoomSelect(room)} // Call handleRoomSelect when button is clicked
                >
                  Select
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}


      
    </div>

    
  );

  
};



export default CardComponent_room;
