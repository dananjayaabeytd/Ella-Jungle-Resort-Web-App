import React, { useState, useEffect } from "react";
import bggreen from '../assets/bggreen.jpg'; // Import the image
import axios from "axios"; // axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // for programmatic navigation

export default function AddEvent() {
  const [eventName, setEventName] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [totalCost, setTotalCost] = useState(0); // Total cost state
  const [file, setFile] = useState(null);
  const [allOptions, setAllOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    
    // Fetch all options when the component mounts
    function getOptions() {
      axios.get("http://localhost:8070/option/allOptions")
        .then((res) => {
          setAllOptions(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getOptions();
  }, []);

  function handleOptionChange(optionId, checked) {
    if (checked) {
      setSelectedOptions(prevSelectedOptions => [...prevSelectedOptions, optionId]);
      
    } else {
      setSelectedOptions(prevSelectedOptions => prevSelectedOptions.filter(id => id !== optionId));
    }
  }
  

  
  
  // Function to calculate total cost
  const calculateTotalCost = () => {
    let cost = 0;
    selectedOptions.forEach((optionId) => {
      const selectedOption = allOptions.find(option => option._id === optionId);
      if (selectedOption) {
        cost += selectedOption.optionPrice;
      }
    });
    return cost;
  };


  
  // Calculate total cost whenever selected options change
  useEffect(() => {
    const cost = calculateTotalCost();
    setTotalCost(cost);
  }, [selectedOptions, allOptions]);





  // Function to handle form submission
  function sendData(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("eventCategory", eventCategory);
    formData.append("eventDate", eventDate);
    formData.append("eventDescription", eventDescription);
    formData.append("totalCost", totalCost);
    formData.append("file", file);

 
  // Append selected option IDs
  selectedOptions.forEach((optionId) => {
    formData.append("selectedOptions[]", optionId);
  });


    axios.post("http://localhost:8070/event/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Event Added");
        setEventName("");
        setEventCategory("");
        setEventDate("");
        setEventDescription("");
        setSelectedOptions([]);
        setFile(null);
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
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
        <div className="container my-10 max-w-4xl mx-auto p-10 bg-secondary-green shadow-2xl shadow-theme-green rounded-[50px] overflow-auto font-lexend opacity-80 border border-theme-green">
          <div className="text-5xl font-extrabold ...">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-black justify-center">
              Add Event
            </span>
          </div>
          
          <form className="mt-3" encType="multipart/form-data" onSubmit={sendData}>

            {/* Event Name */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="eventName">Event Name</label>
              <input type="text" placeholder="Enter Name" name="eventName" value={eventName}
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>

            {/* Event Category */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="eventCategory">Event Category</label>
              <select placeholder="Select Category" name="eventCategory" id="eventCategory" value={eventCategory}
                onChange={(e) => setEventCategory(e.target.value)}
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
              >
                <option value="" disabled>Select Category</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Christmas">Christmas</option>
                <option value="Halloween">Halloween</option>
                <option value="NewYear">NewYear</option>
              </select>
            </div>

            {/* Event Date */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="eventDate">Event Date</label>
              <input type="date" placeholder="Event Date" name="eventDate" value={eventDate}
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                onChange={(e) =>  setEventDate(e.target.value)}
              />
            </div>

            {/* Event Description */}    
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="eventDescription">Event Description</label>
              <textarea cols="50" rows="8" placeholder="Enter Description" name="eventDescription" required value={eventDescription}
                className="h-24 w-full p-1 border border-gray-200 rounded text-lg font-lexend"
                onChange={(e) => setEventDescription(e.target.value)}
              > 
              </textarea>
            </div>

            {/* Decoration Preferences */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800">Decoration Preferences:</label>

              {allOptions && allOptions.filter((option) => option.optionCategory === "Decoration").map((option) => (
                <div key={option._id} className="form-check">
                  <input type="checkbox" id={option._id} name={option.optionName} 
                    checked={selectedOptions.includes(option._id)}
                    onChange={(e) => handleOptionChange(option._id, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <label htmlFor={option._id} className="ml-2 text-green-800">
                    {option.optionName} - {option.optionPrice}  LKR
                  </label>
                </div>
              ))}
            </div>

            {/* Catering Preferences */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800">Catering Preferences:</label>

              {allOptions && allOptions.filter((option) => option.optionCategory === "Catering").map((option) => (
                <div key={option._id} className="form-check">
                  <input type="checkbox" id={option._id} name={option.optionName}
                    checked={selectedOptions.includes(option._id)}
                    onChange={(e) => handleOptionChange(option._id, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <label htmlFor={option._id} className="ml-2 text-green-800">
                    {option.optionName} - {option.optionPrice} LKR
                  </label>
                </div>
              ))}
            </div>



            {/* Entertainment Preferences */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800">Entertainment Preferences:</label>

              {allOptions && allOptions.filter((option) => option.optionCategory === "Entertainment").map((option) => (
                <div key={option._id} className="form-check">
                  <input type="checkbox" id={option._id} name={option.optionName}
                    checked={selectedOptions.includes(option._id)}
                    onChange={(e) => handleOptionChange(option._id, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <label htmlFor={option._id} className="ml-2 text-green-800">
                    {option.optionName} - {option.optionPrice} LKR
                  </label>
                </div>
              ))}
            </div>


            
            {/* Parking Preferences */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800">Parking Preferences:</label>

              {allOptions && allOptions.filter((option) => option.optionCategory === "Parking").map((option) => (
                <div key={option._id} className="form-check">
                  <input type="checkbox" id={option._id} name={option.optionName}
                    checked={selectedOptions.includes(option._id)}
                    onChange={(e) => handleOptionChange(option._id, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <label htmlFor={option._id} className="ml-2 text-green-800">
                    {option.optionName} - {option.optionPrice} LKR
                  </label>
                </div>
              ))}
            </div>


            
            {/* Photography Preferences */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800">Photography Preferences:</label>

              {allOptions && allOptions.filter((option) => option.optionCategory === "Photography").map((option) => (
                <div key={option._id} className="form-check">
                  <input type="checkbox" id={option._id} name={option.optionName}
                    checked={selectedOptions.includes(option._id)}
                    onChange={(e) => handleOptionChange(option._id, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <label htmlFor={option._id} className="ml-2 text-green-800">
                    {option.optionName} - {option.optionPrice} LKR
                  </label>
                </div>
              ))}
            </div>


            {/* Display total cost */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-black">Total Cost: {totalCost} LKR</label>
            </div>




            {/* Event Image */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="file">
                Event Image
              </label>
              <input type="file" id="file" name="file" accept="image/*"
                className="w-full p-2 border border-gray-200 rounded-lg text-lg font-lexend focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <center>
              <br />
              <button className="bg-green-700 text-white text-lg px-6 py-2 border border-black rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950" type="submit" name="submit" id="submit"> Submit </button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}


