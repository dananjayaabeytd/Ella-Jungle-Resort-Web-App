import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'; // Import useSelector
import { useParams, Link, useLocation } from "react-router-dom";

import bggreen from '../assets/bggreen.jpg'; // Import the image
import wedding1 from '../assets/wedding1.jpg';
import birthday1 from '../assets/birthday1.jpg';
import birthday2 from '../assets/birthday2.jpg';
import flora4 from '../assets/flora4.jpg';
import meet1 from '../assets/meet1.jpg';
import EventHeader from './EventHeader';




export default function EventHome() {

    const { eventId } = useParams(); // Get the eventId from URL params

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [allOptions, setAllOptions] = useState([]);

    const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`

    // Existing state and useEffect hook
    const location = useLocation(); // Access location
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [futureEvents, setFutureEvents] = useState([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);


    useEffect(() => {
        // Only trigger the modal if navigated from the Dashboard
        if (location.state?.fromDashboard) {
            // Your existing logic to fetch events and potentially open the modal
            function getEvents() {
                axios.get("http://localhost:5000/event/popUpEvents")
                .then((res) => {
                    alert("EventsFetched");
                  if(res.data && res.data.length > 0) {
                      setFutureEvents(res.data);
                      setIsModalOpen(true); // Open the modal here
                    }
                }).catch((err) => {
                  alert(err.message);
                });
              }
          
              getEvents();
        }
        else{
            alert("No Dashboard");
        }
    }, [location.state]);




    // useEffect(() => {
    //     function getEvents() {
    //       axios.get("http://localhost:5000/event/popUpEvents")
    //       .then((res) => {
    //         if(res.data && res.data.length > 0) {
    //             setFutureEvents(res.data);
    //             setIsModalOpen(true); // Open the modal only if there are future events
    //           }
    //       }).catch((err) => {
    //         alert(err.message);
    //       });
    //     }
    
    //     getEvents();
    //   }, []);




    // Function to move to the next event
    const handleNextEvent = () => {
        if(currentEventIndex < futureEvents.length - 1) {
            setCurrentEventIndex(currentEventIndex + 1);
        } else {
            setIsModalOpen(false); // Close the modal if it's the last event
        }
    };


    // Function to skip the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


// Assuming events is an array of event objects
const currentEvent = futureEvents[currentEventIndex];
      

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
    <div className="relative z-10 flex flex-col justify-items-stretch mr-20 ml-20 justify-center min-h-screen">
            {/* Call Header */}
    <EventHeader/>
  
      {/* Your scrolling content */}
      
      <div className="container bg-fixed my-5  mx-auto px-20  rounded-3xl overflow-auto bg-gray-50 bg-opacity-50 shadow-2xl shadow-theme-green " style={{
            backgroundImage: `url(${flora4})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
      }}>
        
    
  
        <div className="lg:px-0 sm:px-10 pt-0 grid grid-cols-1 gap-10 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1" >
            {/* Event Details */}
            <div className="container  shadow-md rounded-3xl overflow-hidden w-full h-auto flex items-center justify-center bg-fixed" >
                
                <div className="bg-white shadow-md rounded-3xl overflow-hidden w-full h-auto flex items-center justify-center bg-fixed">

                </div>
                
            </div>

            <div className=" px-0 pb-0 pt-0">
                {/* Event Name with Inika font */}
                <h1 className="text-3xl font-bold pl-96 text-white font-inika text-right">Crafting Unforgettable Moments: </h1>
                <h1 className="text-3xl font-bold pl-96 text-white font-inika text-right">Your Event Planning Journey Begins Here</h1>
            
    
                {/* Event Description with McLaren font */}
                <div className="px-40 mt-2 pt-56 pb-16">
                <p className="bg-secondary-green opacity-85 text-xl font-inika text-center rounded-3xl p-4">Welcome to our Event Planning Section, where ideas take flight and planning comes to life. Here, you're not just organizing an event; you're crafting experiences that will last a lifetime. With our tools and personalized guidance, we make your vision a seamless reality. Let's embark on this journey together, creating events that leave lasting impressions</p>
                </div>

            </div>
        
        </div>

        
        
    </div>
    {/* Scrolling content End*/}

    
        {/*Cards are wrapped here */}
        <div className=" flex  p-2 items-center justify-between">

            {/*One Card */}               
            <div className="bg-white max-w-md px-5 m-8 rounded-3xl overflow-hidden shadow-2xl hover:scale-up-110 " 
                style={{
                    backgroundImage: `url(${wedding1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            {/* <img className="w-full" src={christmas1} alt="test" /> */}
                <div className="px-4 py-4 bg-secondary-green  opacity-85 m-2 mt-56 mb-4 rounded-xl">
                    <div className="font-bold text-xl pb-2">
                        <p className="text-base font-bold text-green-800 font-inika text-center">
                            From Planning to Execution - All Your Event Needs in One Place
                            </p>
                    </div>
                        <p className="text-sm font-mclaren text-center">Smooth event management, whether you're planning a large wedding, a birthday party, a social event, or a business conference</p>
                </div>

            </div>
            {/*One Card Ends*/}   


            {/*One Card */}               
            <div className="bg-white max-w-md px-5 m-8 rounded-3xl overflow-hidden shadow-2xl hover:scale-up-110 " 
                style={{
                    backgroundImage: `url(${birthday1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            {/* <img className="w-full" src={christmas1} alt="test" /> */}
                <div className="px-4 py-4 bg-secondary-green opacity-85 m-2 mt-4 mb-56 rounded-xl">
                    <div className="font-bold text-xl pb-2">
                        <p className="text-base font-bold text-green-800 font-inika text-center">
                        Masterful Event Resource Management - Crafting Unforgettable Experiences
                        </p>
                    </div>
                    
                    <p className="text-sm font-mclaren text-center">
                    Efficiently allocate and manage event resources for flawless execution. Stay organized and focused on creating memorable experiences
                    </p>
                </div>

            </div>
            {/*One Card Ends*/}   


            {/*One Card */}               
            <div className="bg-white max-w-md px-5 m-8 rounded-3xl overflow-hidden shadow-2xl hover:scale-up-110 " 
                style={{
                    backgroundImage: `url(${meet1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            {/* <img className="w-full" src={christmas1} alt="test" /> */}
                <div className="px-4 py-4 bg-secondary-green  opacity-85 m-2 mt-56 mb-4 rounded-xl">
                    <div className="font-bold text-xl pb-2">
                        <p className="text-base font-bold text-green-800 font-inika text-center">From Planning to Execution - All Your Event Needs in One Place</p></div>
                        <p className="text-sm font-mclaren text-center">Smooth event management, whether you're planning a large wedding, a birthday party, a social event, or a business conference</p>
                </div>

            </div>
            {/*One Card Ends*/}   
                

            

        </div>
        {/*Cards end here */}


        
             {/* Pop-up Modal for Advertisement */}
             {isModalOpen && currentEvent && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-60 overflow-y-auto h-full w-full" id="my-modal">
                  <div className="relative top-28   mx-auto p-5 w-2/5 h-4/6 shadow-lg rounded-3xl bg-white border-secondary-green " 
                  style={{
                    backgroundImage: `url(http://localhost:5000/Images/${currentEvent.eventImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}>
                    <div className="mx-16 my-14 text-center items-center bg-gray-500 opacity-70 rounded-3xl border-8 border-black border-double">
                      <h3 className="leading-6 text-2xl font-bold text-gray-950 font-inika pt-4 mx-8">{currentEvent.eventName}</h3>
                      <div className="px-7 py-1 pt-2">
                        <p className="text-base font-mclaren text-black">
                        {currentEvent.eventDescription}</p>
                        
                      </div>
                      <div className="text-lg font-semibold text-blue-600 text-center flex justify-between items-center mx-12 mt-1">
                        <p className="text-sm font-mclaren text-black"> 
                        {currentEvent.eventDate ? currentEvent.eventDate.substr(0, 10) : ""}</p>

                        <p className="text-sm font-mclaren text-black">
                        @Ella Jungle Resort</p>
                      </div>
                      <div className="items-center px-4 pb-5 mt-3 flex justify-between mx-6">
                       
                        <Link to={`/buyEventTicket/${currentEvent._id}`} className="px-4 py-2  font-mclaren bg-black text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"> Buy </Link>


                        <button 
                        className="px-4 py-2 font-mclaren bg-black text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" 
                        onClick={handleNextEvent}>
                          Next
                        </button>

                        <button 
                        className="px-4 py-2 font-mclaren bg-black text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" 
                        onClick={handleCloseModal}>
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


