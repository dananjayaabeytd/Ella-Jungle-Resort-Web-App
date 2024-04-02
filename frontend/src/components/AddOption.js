
import React, {useState} from 'react'
import bggreen from '../assets/bggreen.jpg'; // Import the image

import axios from "axios"   //axios for making HTTP requests
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.


function AddOption() {
    
  const [optionCategory, setOptionCategory] = useState("");
  const [optionName, setOptionName] = useState("");
  const [optionPrice, setOptionPrice] = useState("");  

  const navigate = useNavigate();


  function sendData(e) {
    e.preventDefault();

    //const formData = new FormData();

    const newOption = {
        optionCategory, 
        optionName, 
        optionPrice
      }

      axios.post("http://localhost:8070/option/addOption", newOption)
      .then(() => {
          alert("Option Added");
          setOptionCategory("");        //Resetting inout fields
          setOptionName("");
          setOptionPrice("");

          navigate('/allOptions');
      }).catch((err) => {
          alert(err);
      })
  }

  
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

  <div className="container my-10 max-w-4xl mx-auto p-10 bg-theme-green shadow-2xl shadow-green-400 rounded-[50px] overflow-auto font-lexend">
    <div className="text-5xl font-extrabold ...">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-black justify-center">
        Add Option
      </span>
    </div>
    
    <form className="mt-3" onSubmit={sendData}>

        {/* Option Category */}
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-green-800" htmlFor="optionCategory">Option Category</label>
        <select
          className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
          placeholder="Select Category"
          name="optionCategory"
          id="optionCategory"
          value={optionCategory}
          onChange={(e) => setOptionCategory(e.target.value)}
        >
          <option value="" disabled>Select Category</option>
          <option value="Decoration">Decoration</option>
          <option value="Catering">Catering</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Parking">Parking</option>
          <option value="Photography">Photography</option>
          <option value="Other">Other</option>
        </select>
      </div>


      {/* Option Name */}
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-green-800" htmlFor="optionName">Option Name</label>
        <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
          type="text" placeholder="Enter Name" name="optionName" value={optionName}
          onChange={(e) => setOptionName(e.target.value)}
        />
      </div>

      


      {/* Option Price */}
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-green-800" htmlFor="optionPrice">Option Price</label>
        <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
          type="number" placeholder="Enter Price" name="optionPrice" value={optionPrice}
          onChange={(e) =>  setOptionPrice(e.target.value)}
        />
      </div>


      <center>
        <br />
        <button className="bg-green-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950 " type="submit" name="submit" id="submit">
          Submit
        </button>
      </center>
    </form>
  </div>
</div>
</div>


  );
}

export default AddOption
