// RoomCard.jsx

import React from 'react';
import axios from 'axios';

const RoomCard = ({ room, fetchRooms }) => {
  const handleUpdate = () => {
    // Handle update logic here
    console.log(`Updating room: ${room._id}`);
    // Redirect user to update page or open a modal for update form
  };

  const handleDelete = async () => {
    try {
      // Make DELETE request to backend to delete the room
      await axios.delete(`/residence/rooms/${room._id}`);
      // After successful deletion, refetch rooms
      fetchRooms();
      console.log(`Deleting room: ${room._id}`);
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  return (
    <div className="max-w-5xl rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={room.picture} alt={room.roomName} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{room.roomName}</div>
        <p className="text-gray-700 text-base">{room.description}</p>
        <p className="text-gray-700 text-base">Room Type: {room.roomType}</p>
        <p className="text-gray-700 text-base">Max Count: {room.maxCount}</p>
        <p className="text-gray-700 text-base">Price: ${room.price}</p>
        <div className="mt-4 flex ">
          <button
            onClick={handleUpdate}
            className="bg-green-500 hover:bg-black text-white font-bold py-2 px-4 rounded transition-colors duration-300 mr-8"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-green-500 hover:bg-black text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
