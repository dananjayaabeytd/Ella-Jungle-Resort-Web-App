import React from 'react'
import christmas1 from '../assets/christmas1.jpg';

export default function TestPage() {
  return (
    <div className=" flex px-5 p-5 items-center justify-between">
        <div className="max-w-xs px-5 rounded overflow-hidden shadow-lg hover:scale-up-110 transition duration-115 ease-in-out">
        <img className="w-full" src={christmas1} alt="test" />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2"></div>
            <p className="text-gray-700 text-base"></p>
        </div>
        </div>
    </div>





    
  )
}

