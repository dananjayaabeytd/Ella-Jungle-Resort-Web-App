import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'; // Import useSelector
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import bggreen from '../assets/bggreen.jpg'; // Import the image
import EventHeader from './EventHeader';

// ViewEvent
export default function PopupAd() {

    const [selectedEvent, setSelectedEvent] = useState(null);
    const { eventId } = useParams(); // Get the eventId from URL params

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [allOptions, setAllOptions] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);

    const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`

    const navigate = useNavigate();
  
    useEffect(() => {
        // Fetch all options when the component mounts
        function getOptions() {
          axios.get("http://localhost:5000/option/allOptions")
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
            const response = await axios.get(`http://localhost:5000/event/getSelectedEvent/${eventId}`);
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


  const handleDeleteClick = (eventId) => {
    setSelectedEventId(eventId); // Set the option ID to state
    setIsModalOpen(true); // Show the modal
  };
  

  const confirmDelete = async () => {
    if (selectedEventId) {
      try {
        await axios.delete(`http://localhost:5000/event/deleteEvent/${selectedEventId}`);
        alert("Event Deleted Successfully!");
        setIsModalOpen(false); // Close the modal
        navigate("/events");
        // setOption(allOptions.filter(option => option._id !== selectedOptionId)); // Update state to remove the item
      } catch (error) {
        console.error("Error deleting option:", error.message);
        alert("Error deleting option. Please try again.");
      }
    }
  };
  

  
  if (!selectedEvent) {
    return <div>Loading...</div>;
  }


  // Get unique categories
  const categories = [...new Set(allOptions.map((option) => option.optionCategory))];



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
                <img className="w-full h-full object-fill" src={`http://localhost:5000/Images/${selectedEvent.eventImage}`} 
                />
            </div>

            <div className="px-0 pb-0 pt-0">
                {/* Event Name with Inika font */}
                <h1 className="text-4xl font-bold text-green-800 font-inika text-center">{selectedEvent.eventName}</h1>
                
                {/* Event Date with Lexend font */}
                <h6 className="text-base text-gray-600 font-lexend text-center">Ella Jungle Resort</h6>
                
                <div className="price mt-2">
                <div className="text-2xl font-bold text-blue-600 text-center">{selectedEvent.eventDate ? selectedEvent.eventDate.substr(0, 10) : ""}</div>
                </div>
    
                {/* Event Description with McLaren font */}
                <div className="p-des mt-2 max-h-24">
                <p className="text-lg font-mclaren text-center">{selectedEvent.eventDescription}</p>
                </div>

            </div>

            {/*Options Loop*/}
            <div className="lg:pl-2 lg:pr-0 sm:px-20 pt-0 grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">             
              {categories.map((category, index) => (
                      <div key={index} className="text-base font-semibold ml-16">
                        {/* Category Title */}
                        <p className="mt-0 mb-1 block text-xl font-inika text-green-800">{category} Options:-</p>
                        {/* Options for this category */}
                        {allOptions.filter((option) => option.optionCategory === category).map((option) => (
                            <div key={option._id} className="form-check">
                              <input type="checkbox" id={option._id} name={option.optionName}
                                checked={selectedOptions.includes(option._id)}
                                className="form-checkbox h-5 w-5 appearance-none rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent checked:bg-theme-green checked:border-transparent checked:border-2"
                              />
                              <label htmlFor={option._id} className="ml-2 text-lg text-black">
                                {option.optionName}
                              </label>
                            </div>
                          ))}
                      </div>
                    ))}
            </div> 
            {/*Options Loop Ends Here*/}
            

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

                    <button className=" text-white text-xl font-mclaren px-4 py-1  bg-red-500 hover:bg-red-800 rounded-3xl" 
                    onClick={() => handleDeleteClick(selectedEvent._id)}>
                        Delete
                    </button>
                </div>
                      
            </div>  
  
        </div>
        
    </div>
    {/* Scrolling content End*/}

        
            {/* Pop-up Modal for deletion confirmation */}
            {/* {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                  <div className="relative top-1/3  mx-auto p-5 w-96 shadow-lg rounded-3xl bg-white border-secondary-green " >
                    <div className="mt-3 text-center">
                      <h3 className="leading-6 text-xl font-bold text-green-800 font-inika pt-4">Deletion Confirmation</h3>
                      <div className="mt-2 px-7 py-3">
                        <p className="text-md font-mclaren text-gray-500">
                          Are you sure you want to remove this event? This action cannot be undone</p>
                      </div>
                      <div className="items-center px-4 py-3">
                        <button id="delete-btn" 
                        className="px-4 py-2 mx-2 font-mclaren bg-red-500 text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" 
                        onClick={confirmDelete}>
                          Delete
                        </button>
                        <button 
                        className="px-4 py-2 mx-2 font-mclaren bg-gray-500 text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" 
                        onClick={() => setIsModalOpen(false)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}
              {/* Pop-up Ends Here */}



               {/* Pop-up Modal for Advertisement */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                  <div className="relative top-28  mx-auto p-5 w-1/3 h-3/5 shadow-lg rounded-3xl bg-white border-secondary-green " 
                  style={{
                    backgroundImage: `url(http://localhost:5000/Images/${selectedEvent.eventImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}>
                    <div className="mx-16 my-14 text-center items-center bg-white opacity-70 rounded-3xl border-8 border-black border-double">
                      <h3 className="leading-6 text-2xl font-bold text-gray-950 font-inika pt-4 mx-8">{selectedEvent.eventName}</h3>
                      <div className="px-7 py-1 pt-2">
                        <p className="text-md font-mclaren text-black">
                        {selectedEvent.eventDescription}</p>
                        
                      </div>
                      <div className="text-lg font-semibold text-blue-600 text-center flex justify-between items-center mx-12 mt-1">
                        <p className="text-sm font-mclaren text-black"> 
                        {selectedEvent.eventDate ? selectedEvent.eventDate.substr(0, 10) : ""}</p>

                        <p className="text-sm font-mclaren text-black">
                        @Ella Jungle Resort</p>
                      </div>
                      <div className="items-center px-4 pb-5 mt-3 flex justify-between mx-16">
                        <button id="delete-btn" 
                        className="px-4 py-2  font-mclaren bg-black text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" 
                        onClick={confirmDelete}>
                          Buy
                        </button>

                        <button 
                        className="px-4 py-2 font-mclaren bg-gray-900 text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" 
                        >
                          Next
                        </button>

                        <button 
                        className="px-4 py-2 font-mclaren bg-gray-900 text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" 
                        onClick={() => setIsModalOpen(false)}>
                          Skip
                        </button>

                        
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Pop-up Ends Here */}

      
    
    </div>
  </div>
  )
}


