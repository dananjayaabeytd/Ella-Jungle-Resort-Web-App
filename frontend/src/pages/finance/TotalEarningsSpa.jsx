import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalEarningsSpa = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/finance/allSpaAppointments");
        const reservations = response.data;
        const totalEarnings = reservations.reduce((acc, reservation) => acc + reservation.totalPrice, 0);
        setTotalAmount(totalEarnings);
      } catch (err) {
        console.error('Error fetching reservations:', err);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div>
      <h2>Total Earnings from Spa</h2>
      <p>Total Amount: Rs.{totalAmount.toFixed(2)}</p>
    </div>
  );
};



export default TotalEarningsSpa;