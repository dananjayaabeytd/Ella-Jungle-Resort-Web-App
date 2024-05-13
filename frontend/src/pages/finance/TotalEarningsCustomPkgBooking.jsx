import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalEarningsCustomPkgBooking = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/finance/allCustomPackageBooking");
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
    <div className="bg-white">
      <h2 className="text-xl font-semibold mb-4">Total Earnings from Custom Package Bookings</h2>
      <p className="text-lg" id="customPackageAmount">Total Amount: Rs.{totalAmount.toFixed(2)}</p>
    </div>
  );
};

export default TotalEarningsCustomPkgBooking;
