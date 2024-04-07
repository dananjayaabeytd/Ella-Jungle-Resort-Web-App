import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import {useReactToPrint} from 'react-to-print';

const ReservationPage = () => {
    // State variables
    const [reservations, setReservations] = useState([]);

    // Fetch all reservations
    const fetchReservations = async () => {
        try {
            const response = await axios.get('/reservation/bookings');
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    // UseEffect to fetch reservations when component loads
    useEffect(() => {
        fetchReservations();
    }, []);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        DocumentTitle:"Reservation Details",
        onAfterPrint: () => console.log("Printing done")
    });

    const generateRef = useRef();
    const handleReport = useReactToPrint({
        content: () => generateRef.current,
        DocumentTitle:"Reservation Report",
        onAfterPrint: () => console.log("Report Printing done")
    });

    return (
        <div ref={generateRef}>
      <h1 className=' text-center font-bold text-3xl my-20'>Reservation Page</h1>
      {reservations.map((reservation) => (
        <div
          key={reservation.id}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2 my-10 mx-20"
            ref={componentRef}
        >
          <h1 className="hidden print:block text-center font-semibold text-xl py-10">Reservation Details</h1>
          <h2>{reservation.roomID}</h2>
          <p>{reservation.fullName}</p>
          <p>{reservation.email}</p>
          <p>{reservation.contactNo}</p>
          <p>Check In: {reservation.checkIn}</p>
          <p>Check Out: {reservation.checkOut}</p>
          <button onClick={handlePrint} className="self-end bg-green-500 hover:bg-black text-white font-bold py-2 px-4 rounded print:hidden">
            Print
          </button>
        </div>
      ))}
      <div className='flex justify-center mb-10'>
        <button onClick={handleReport} className='bg-green-500 hover:bg-black text-white font-bold py-2 px-4 rounded print:hidden'>Generate Report</button>
        </div>
    </div>
    );
};

export default ReservationPage;