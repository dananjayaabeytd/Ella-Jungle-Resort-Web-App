import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalEarningsHotelPkgBooking = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/finance/allHotelPackageBooking");
        const bookings = response.data;
        const totalEarnings = bookings.reduce((acc, booking) => acc + booking.price, 0);
        setTotalAmount(totalEarnings);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Total Earnings from Hotel Package Bookings</h2>
      <p>Total Amount: Rs.{totalAmount.toFixed(2)}</p>
    </div>
  );
};

export default TotalEarningsHotelPkgBooking;
