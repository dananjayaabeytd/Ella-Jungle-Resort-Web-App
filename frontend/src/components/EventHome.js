import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'; // Import useSelector
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import bggreen from '../assets/bggreen.jpg'; // Import the image
import wedding1 from '../assets/wedding1.jpg';
import birthday1 from '../assets/birthday1.jpg';
import birthday2 from '../assets/birthday2.jpg';
import meet1 from '../assets/meet1.jpg';
import EventHeader from './EventHeader';


export default function EventHome() {

    const { eventId } = useParams(); // Get the eventId from URL params

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [allOptions, setAllOptions] = useState([]);

    const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`
  
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
            backgroundImage: `url(${birthday2})`,
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
                <p className="bg-secondary-green opacity-85 text-lg font-inika text-center rounded-3xl p-4">Welcome to our Event Planning Section, where ideas take flight and planning comes to life. Here, you're not just organizing an event; you're crafting experiences that will last a lifetime. With our tools and personalized guidance, we make your vision a seamless reality. Let's embark on this journey together, creating events that leave lasting impressions</p>
                </div>

            </div>
        

            {/* <div className="lg:px-40 sm:px-20 pb-5 grid grid-cols-1 gap-10 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                <div className="mt-0 flex justify-center items-center">
                    {/* Using Link component for View button */}
                    {/* <Link to={`/update`} className=" text-white text-xl font-mclaren px-4 py-1  bg-theme-green hover:bg-green-800 rounded-3xl"> Update </Link>

                    <button className="mx-28 text-white text-xl font-mclaren px-4 py-1  bg-blue-500 hover:bg-blue-800 rounded-3xl">
                        Buy
                    </button>

                    <button className=" text-white text-xl font-mclaren px-4 py-1  bg-red-500 hover:bg-red-800 rounded-3xl" >
                        Delete
                    </button>
                </div>
                      
            </div>   */}
  
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


        


        
    </div>

    
  </div>
  )
}


