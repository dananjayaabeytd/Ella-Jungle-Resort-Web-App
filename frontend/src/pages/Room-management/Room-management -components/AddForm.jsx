import React, { useState } from 'react';

const Roomform = () => {
  const [roomDetails, setRoomDetails] = useState({
    roomName: '',
    roomType: '',
    maxCount: '',
    picture: '',
    description: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRoomDetails(prevState => ({
      ...prevState,
      picture: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit form data
    console.log(roomDetails);
    // Reset form fields
    setRoomDetails({
      roomName: '',
      roomType: '',
      maxCount: '',
      picture: '',
      description: '',
      price: ''
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-green-200 rounded-lg p-8 shadow-lg">
      <h1 className="text-4xl text-center font-sans font-bold pb-8 text-black">Add Rooms</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="roomName" className="block text-sm font-medium text-gray-700">Room Name</label>
            <input type="text" id="roomName" name="roomName" value={roomDetails.roomName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">Room Type</label>
            <input type="text" id="roomType" name="roomType" value={roomDetails.roomType} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="maxCount" className="block text-sm font-medium text-gray-700">Max Count</label>
            <input type="number" id="maxCount" name="maxCount" value={roomDetails.maxCount} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="picture" className="block text-sm font-medium text-gray-700">Picture</label>
            <input type="file" id="picture" name="picture" onChange={handleImageChange} accept="image/*" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" value={roomDetails.description} onChange={handleChange} rows="3" className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input type="text" id="price" name="price" value={roomDetails.price} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <button type="submit" className="bg-green-700 hover:bg-black text-white font-semibold py-2 px-4 rounded transition-colors ease-in-out duration-300">Add Room</button>
        </form>
      </div>
    </div>
  );
};

export default Roomform;
