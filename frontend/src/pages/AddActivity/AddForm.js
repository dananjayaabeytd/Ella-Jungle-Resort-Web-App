

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import ActivityBackground from '../../assets/ActivityBackground.jpg';



const AddForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [distance, setDistance] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook for navigation



  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("distance", distance);
    formData.append("price", price);
    formData.append("image", image);





    try {
      await axios.post("http://localhost:8080/SpecialActivity/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Special Activity Added");
      navigate("/"); // Navigate to the home page after successful submission

    } catch (error) {
      console.error(error);
      setError("Error adding special activity");
  } finally {
      setIsLoading(false);
  }
  };

//handle name input to only enter letters
const handleNameChange=(e)=>{
  const value = e.target.value.replace(/[^A-Za-z ]/gi, "");
  setName(value);
}



//prevet entereing negative values for distance input
const handleDistanceChange=(e)=>{
  const value = Math.max(0,parseFloat(e.target.value));
  setDistance(value);
}



//prevent entering negative values for the price
const handlePriceChnage=(e)=>{
  const value= Math.max(0,parseFloat(e.target.value));
  setPrice(value);
}


  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(${ActivityBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-green-600 bg-opacity-50 flex items-center justify-center w-full max-w-[600px] rounded-xl py-14 px-11 text-xl font-extrabold text-black shadow-lg shadow-black">
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <h2 className="self-center text-3xl text-white mb-8">Add a Special Activity</h2>
          
          {isLoading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}


          <div>
            <label htmlFor="image" className="mt-4">Image</label><br />
            <input type="file" id="image" accept="image/*" onChange={handleFileChange} required />
          </div>

          <br />

          <div>
            <label htmlFor="name" className="mt-4">Name</label><br />
            <input type="text" id="name" className="mt-2 rounded-3xl bg-zinc-300 h-[47px] font-normal px-5 py-1 text-sm w-full"
              value={name} onChange={handleNameChange} required />
          </div>

          <br />

          <div>
            <label htmlFor="description" className="mt-8">Description</label>
            <textarea id="description" className="mt-3 max-w-full h-20 rounded-3xl bg-zinc-300 w-[509px] font-normal px-5 py-1 text-sm"
              value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <br />

          <div>
             <label htmlFor="distance" className="mt-8">Distance(km)</label><br />
             <input type="number" id="distance" className="mt-2 rounded-3xl bg-zinc-300 h-[50px] font-normal px-5 py-1"
             value={distance} onChange={handleDistanceChange} required />
          </div>

          <br />

          <div>
            <label htmlFor="price" className="mt-8">Price Per Person (LKR)</label><br />
            <input type="number" id="price" className="mt-2 rounded-3xl bg-zinc-300 h-[50px] font-normal px-5 py-1"
              value={price} onChange={handlePriceChnage} required />
          </div>


          <button type="submit" className="justify-center self-center px-8 py-3 mt-14 whitespace-nowrap bg-green-800 rounded-[60px] hover:bg-green-600 shadow-lg shadow-black">
            Submit
          </button>


        </form>
      </div>
    </div>
  );
};

export default AddForm;
