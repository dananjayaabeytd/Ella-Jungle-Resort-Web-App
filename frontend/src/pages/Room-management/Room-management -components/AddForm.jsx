import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Roomform = () => {
  const [roomDetails, setRoomDetails] = useState({
    roomName: '',
    roomType: '',
    maxCount: '',
    description: '',
    price: ''
  });

  const [selectedFile, setSelectedFile] = useState(null); // Single file state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const navigate = useNavigate(); // Access navigate object for redirection

  const handlefileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Store the single selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
  
      const imageResponse = await axios.post('/residence/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      const imagePath = imageResponse.data.filename;
      console.log('Image uploaded successfully:', imagePath);
  
      const roomDetailsWithImage = {
        ...roomDetails,
        image: imagePath
      };
  
      const roomResponse = await axios.post('/residence/rooms', roomDetailsWithImage);
      console.log('Room added successfully:', roomResponse.data);
  
      setRoomDetails({
        roomName: '',
        roomType: '',
        maxCount: '',
        description: '',
        price: ''
      });

      navigate('/roomPage'); // Replace '/roomPAge' with your actual room details page path

    } catch (error) {
      console.error('Error adding room:', error);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-green-200 rounded-lg p-12 shadow-lg w-96">
        <h1 className="text-4xl text-center font-sans font-bold pb-8 text-black">Add Rooms</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="roomName" className="block text-sm font-medium text-gray-700">Room Name</label>
            <input type="text" id="roomName" name="roomName" value={roomDetails.roomName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-6">
          <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">Room Type</label>
            <select id="roomType" name="roomType" value={roomDetails.roomType} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
              <option value="">Select Room Type</option>
              <option value="chalet">Chalet</option>
              <option value="cabin">Cabin</option>
              <option value="cottage">Cottage</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="maxCount" className="block text-sm font-medium text-gray-700">Max Count</label>
            <input type="number" id="maxCount" name="maxCount" value={roomDetails.maxCount} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-6">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Picture URL</label>
            <input type="file" id="image" name="image"  onChange={handlefileChange}  className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" value={roomDetails.description} onChange={handleChange} rows="3" className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input type="text" id="price" name="price" value={roomDetails.price} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <button type="submit" className="bg-green-700 hover:bg-black text-white font-semibold py-2 px-4 rounded transition-colors ease-in-out duration-300" >Add Room</button>
        </form>
      </div>
    </div>
  );
};

export default Roomform;
