import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomCard from '../Room-management/Room-management -components/RoomCard';

const RoomPage = () => {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('/residence/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="container mx-auto my-10 flex flex-col items-center ">
      <h1 className="text-3xl font-semibold mb-4">All Rooms</h1>
      <div className="mx-20">{rooms.map(room => (
        <RoomCard key={room._id} room={room} fetchRooms={fetchRooms} />
      ))}</div>
    </div>
  );
};

export default RoomPage;
