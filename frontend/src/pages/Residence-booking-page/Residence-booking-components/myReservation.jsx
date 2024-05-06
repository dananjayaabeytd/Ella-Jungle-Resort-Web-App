import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MyReservation = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('/reservation/bookings');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

   

    const fetchRooms = async () => {
      try {
        const response = await axios.get('/residence/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchReservations();
    fetchRooms();
  }, []);

  const formatDate = (dateString) => {
    return dateString.substring(0, 10); // Extract first 10 characters (YYYY-MM-DD)
};

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-center font-bold text-3xl my-20">My Reservations</h1>
      <div className="flex flex-wrap justify-center mr-10">
        {reservations.map(reservation => {
          // Filter reservations based on user ID
          if (reservation.userID !== userInfo._id) return null;

          const room = rooms.find(room => room._id === reservation.roomID);
          if (!room) return null; // Skip if room details are not found

          return (
            <div key={reservation.id} className="bg-white rounded-lg shadow-md flex flex-row items-center p-10 my-10 mx-5 hover:shadow-2xl hover:scale-110 transition duration-75 ease-in">
              {/* Room photo */}
              <div className="flex-shrink-0 mr-4">
                <img src={require(`../../../assets/${room.image}`)} alt={room.roomName} className="w-full h-64 object-cover rounded-lg " />
              </div>
              {/* Room details */}
              <div className='ml-10'>
                <label htmlFor="RoomName"> Room Name : </label>
                <h2 className="font-bold pb-2">{room.roomName}</h2>

                <label htmlFor="Room Type"> Room Type : </label>
                <p  className="font-bold pb-2">{room.roomType}</p>

                <label htmlFor="max guest"> Max guests : </label>
                <p  className="font-bold pb-2">{room.maxCount} Guests</p>

                <label htmlFor="price"> Room Price : </label>
                <p  className="font-bold pb-2">Price: {room.price}</p>
                
                <label htmlFor="checkIn"> Check In : </label>
                <p   className="font-bold pb-2">{formatDate(reservation.checkIn)}</p>

                <label htmlFor="checkOut"> Check Out : </label>
                <p  className="font-bold pb-2">{formatDate(reservation.checkOut)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyReservation;
