import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import bggreen from '../assets/bggreen.jpg'; // Import the image

export default function ViewEvent() {

    const [selectedEvent, setSelectedEvent] = useState(null);
    const { eventId } = useParams(); // Get the eventId from URL params

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [allOptions, setAllOptions] = useState([]);
  
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
    

      
    useEffect(() => {
        // Fetch event data based on eventId when the component mounts
        async function getEventDetails() {
        try {
            const response = await axios.get(`http://localhost:8070/event/get/${eventId}`);
            setSelectedEvent(response.data.event);
            console.log("Fetched Event Details Successfully");


            const eventSelectedOptions = response.data.event.selectedOptions || [];
            setSelectedOptions(eventSelectedOptions.map(id => id.toString())); // Ensuring IDs are strings for comparison

        
        } catch (error) {
            console.error("Error fetching event data:", error.message);
            alert("Error fetching event data. Please try again.");
        }
    }

    getEventDetails();
  }, [eventId]);


  
  const handleDeleteClick = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8070/event/delete/${eventId}`);
      alert("Event deleted successfully!");
      window.location.reload(); // Refresh the page after deletion
    } catch (error) {
      console.error("Error deleting event:", error.message);
      alert("Error deleting event. Please try again.");
    }
  };
  

  
  if (!selectedEvent) {
    return <div>Loading...</div>;
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
            
  
      {/* Your scrolling content */}
      
      <div className="container bg-fixed my-5 max-w-5xl mx-auto p-5  rounded-3xl overflow-auto bg-gray-50 bg-opacity-50 shadow-2xl shadow-theme-green border-8 border-double border-theme-green">

      
  
        <div className="lg:px-40 sm:px-10 pt-4 grid grid-cols-1 gap-10 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
            {/* Event Details */}
            <div className="container shadow-md rounded-3xl overflow-hidden w-full h-96 flex items-center justify-center">
                <img className="w-full h-full object-fill" src={`http://localhost:8070/Images/${selectedEvent.eventImage}`} 
                />
            </div>

            <div className="px-0 pb-0 pt-0">
                {/* Event Name with Inika font */}
                <h1 className="text-3xl font-bold text-green-800 font-inika text-center">{selectedEvent.eventName}</h1>
                
                {/* Event Date with Lexend font */}
                <h6 className="text-base text-gray-600 font-lexend text-center">Ella Jungle Resort</h6>
                
                <div className="price mt-2">
                <div className="text-xl font-bold text-blue-600 text-center">{selectedEvent.eventDate ? selectedEvent.eventDate.substr(0, 10) : ""}</div>
                </div>
    
                {/* Event Description with McLaren font */}
                <div className="p-des mt-2 max-h-24">
                <p className="text-base font-mclaren text-center">{selectedEvent.eventDescription}</p>
                </div>

            </div>

            
            <div className="lg:pl-2 lg:pr-0 sm:px-20 pt-0 grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                
            {/* Decoration Preferences */}
            
            <div className="text-base font-semibold ml-12">
              <label className="block font-bold text-lg text-green-800">Decoration Preferences:</label>
              {allOptions && allOptions.filter((option) => option.optionCategory === "Decoration").map((option) => (
                <div key={option._id} className="form-check">
                  <input type="checkbox" id={option._id} name={option.optionName} checked={selectedOptions.includes(option._id)}
                    className="form-checkbox h-5 w-5 appearance-none rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent checked:bg-theme-green checked:border-transparent checked:border-2"
                  />
                  <label htmlFor={option._id} className="ml-2  text-green-800">
                    {option.optionName} 
                  </label>
                </div>
              ))}
            </div>

            {/* Catering Preferences */}
            <div className="text-base font-semibold ml-16">
              <label className="block font-bold text-lg text-green-800">Catering Preferences:</label>

              {allOptions && allOptions.filter((option) => option.optionCategory === "Catering").map((option) => (
                <div key={option._id} className="form-check">
                  <input type="checkbox" id={option._id} name={option.optionName}
                    checked={selectedOptions.includes(option._id)}
                    className="form-checkbox h-5 w-5 appearance-none rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent checked:bg-theme-green checked:border-transparent checked:border-2"
                  />
                  <label htmlFor={option._id} className="ml-2 text-green-800">
                    {option.optionName} 
                  </label>
                </div>
              ))}
            </div>



            {/* Entertainment Preferences */}
            <div className="text-base font-semibold ml-12">
              <label className="block font-bold text-lg text-green-800">Entertainment Preferences:</label>

              {allOptions && allOptions.filter((option) => option.optionCategory === "Entertainment").map((option) => (
                <div key={option._id} className="form-check">
                  <input type="checkbox" id={option._id} name={option.optionName}
                    checked={selectedOptions.includes(option._id)}
                    className="form-checkbox h-5 w-5 appearance-none rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent checked:bg-theme-green checked:border-transparent checked:border-2"
                  />
                  <label htmlFor={option._id} className="ml-2 text-green-800">
                    {option.optionName} 
                  </label>
                </div>
              ))}
            </div>


            
            {/* Parking Preferences */}
            <div className="text-base font-semibold ml-16">
              <label className="block font-bold text-lg text-green-800">Parking Preferences:</label>

              {allOptions && allOptions.filter((option) => option.optionCategory === "Parking").map((option) => (
                <div key={option._id} className="form-check">
                  <input type="checkbox" id={option._id} name={option.optionName}
                    checked={selectedOptions.includes(option._id)}
                    className="form-checkbox h-5 w-5 appearance-none rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent checked:bg-theme-green checked:border-transparent checked:border-2"
                  />
                  <label htmlFor={option._id} className="ml-2 text-green-800">
                    {option.optionName} 
                  </label>
                </div>
              ))}
            </div>


            
            {/* Photography Preferences */}
            <div className="text-base font-semibold ml-12">
              <label className="block font-bold text-lg text-green-800">Photography Preferences:</label>

              {allOptions && allOptions.filter((option) => option.optionCategory === "Photography").map((option) => (
                <div key={option._id} className="form-check">
                  <input type="checkbox" id={option._id} name={option.optionName}
                    checked={selectedOptions.includes(option._id)}
                    className="form-checkbox h-5 w-5 appearance-none rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent checked:bg-theme-green checked:border-transparent checked:border-2"
                  />
                  <label htmlFor={option._id} className="ml-2 text-green-800">
                    {option.optionName} 
                  </label>
                </div>
              ))}
            </div>

            {/* Other Preferences */}
            <div className="text-base font-semibold ml-16">
              <label className="block font-bold text-lg text-green-800">Other Preferences:</label>

              {allOptions && allOptions.filter((option) => option.optionCategory === "Other").map((option) => (
                <div key={option._id} className="form-check">
                  <input type="checkbox" id={option._id} name={option.optionName}
                    checked={selectedOptions.includes(option._id)}
                    className="form-checkbox h-5 w-5 appearance-none rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent checked:bg-theme-green checked:border-transparent checked:border-2"
                  />
                  <label htmlFor={option._id} className="ml-2 text-green-800">
                    {option.optionName} 
                  </label>
                </div>
              ))}
            </div>
        </div> 

            {/* Display total cost */}
            <div className="text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-black text-center">Total Cost: {selectedEvent.totalCost} LKR</label>
            </div>

        
        

            <div className="lg:px-40 sm:px-20 pb-5 grid grid-cols-1 gap-10 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                <div className="mt-0 flex justify-center items-center">
                    {/* Using Link component for View button */}
                    <Link to={`/updateEvent/${selectedEvent._id}`} className=" text-white text-xl font-mclaren px-4 py-1  bg-theme-green hover:bg-green-800 rounded-3xl"> Update </Link>

                    <button className="mx-28 text-white text-xl font-mclaren px-4 py-1  bg-blue-500 hover:bg-blue-800 rounded-3xl">
                        Buy
                    </button>

                    <button className=" text-white text-xl font-mclaren px-4 py-1  bg-red-500 hover:bg-red-800 rounded-3xl" onClick={() => handleDeleteClick(selectedEvent._id)}>
                        Delete
                    </button>
                </div>
                      
            </div>  
  
        </div>
        
    </div>
    {/* Scrolling content End*/}
      
    
    </div>
  </div>
  )
}


