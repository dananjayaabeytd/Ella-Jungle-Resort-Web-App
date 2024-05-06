import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

 function BackgroundText() {
  const { userInfo } = useSelector(state => state.auth);

  const navigate = useNavigate(); // Access navigate object for redirection

  navigate('/available'); // Replace '/roomPage' with your actual room details page path

  return (
    <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://www.ellajungleresort.lk/wp-content/uploads/2019/06/home_004.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4 font-mono ">Luxury in the middle of the jungle</h1>
          <p className="text-lg justify-normal">Immerse yourself in nature's embrace at our jungle hotel, where luxury meets the wild. Wake up to the sounds of exotic birds and lush greenery outside your window. </p>
          <button
      onClick={() => window.location.href = '/available'}
      className="text-1xl mt-20 rounded-full bg-white bg-opacity-30 text-cyan-500 font-bold py-2 px-4 hover:bg-opacity-70 hover:text-black transition duration-300 ease-in-out"
    >Book Now !
    </button>
    <button
      onClick={() => window.location.href = `/myReservations/${userInfo._id}`}
      className="ml-10 text-1xl mt-20 rounded-full bg-white bg-opacity-30 text-cyan-500 font-bold py-2 px-4 hover:bg-opacity-70 hover:text-black transition duration-300 ease-in-out"
    >My Reservations!
    </button>
        </div>
      </div>
    </div>
  )
}

export default BackgroundText;
