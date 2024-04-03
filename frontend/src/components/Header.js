import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

import bggreen from '../assets/bggreen.jpg'; // Import the image

function Header() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="relative bg-theme-green flex justify-between items-center h-14 w-auto  mx-2 px-0 text-black" style={{
        backgroundImage: `url(${bggreen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <h1 className="w-full text-xl font-bold font-lexend md:flex text-gray-900 m-2">Ella Jungle Resort</h1>

      <ul className="hidden md:flex font-lexend ">
        <Link to="/home" className="p-2 px-6  hover:scale-110">Home</Link>
        <Link to="/" className="p-2 px-6  hover:scale-110">Events</Link>
        <Link to="/add" className="p-2 px-6  hover:scale-110">Book</Link>
        <Link to="/allOptions" className="p-2 px-6  hover:scale-110">Services</Link>
        <Link to="/test" className="p-2 px-6  hover:scale-110">Bookings</Link>
      </ul>
      <div onClick={handleNav} className="block px-8">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <div style={{
        backgroundImage: `url(${bggreen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} className={!nav ? "fixed left-0 top-0 w-56 h-full border-r border  opacity-95 ease-in-out duration-500" : "fixed left-[-100%]"}>
        <h1 className="w-full text-xl font-bold text-gray-900 m-4 font-lexend">Ella Jungle Resort</h1>

        <ul className="p-4 uppercase font-lexend">
          <li className="p-4 border-b border-gray-600">Home</li>
          <li className="p-4 border-b border-gray-600">Events</li>
          <li className="p-4 border-b border-gray-600">Book Event</li>
          <li className="p-4 border-b border-gray-600">Services</li>
          <li className="p-4 border-b border-gray-600">Bookings</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
