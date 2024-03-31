import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailableRooms = () => {

    const [rooms, setRooms] = useState([]);
    
    

    const fetchRooms = async () => {
        try {
            
            const response = await axios.get('/residence/rooms');
            setRooms(response.data);
            
        } catch (error) {
            console.log('Error fetching rooms : ', error);
        }
    };
    
    useEffect( () => {
        fetchRooms();
       
    }, []);

    
    return (
        <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rooms.map(room => (
                <div key={room.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    {room.image && ( // Check if room.image exists before using it
      <img src={require(`../../../assets/${room.image}`)} alt={room.roomName} className="w-full h-64 object-cover" />
    )}
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">{room.roomName}</h2>
                        <p className="text-gray-700 mb-2">Type: {room.roomType}</p>
                        <p className="text-gray-700 mb-2">Max Count: {room.maxCount}</p>
                        <p className="text-gray-700 mb-2">Price: ${room.price}</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={() => window.location.href = `/Booking/${room._id}`} >Book Now</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}
export default AvailableRooms;