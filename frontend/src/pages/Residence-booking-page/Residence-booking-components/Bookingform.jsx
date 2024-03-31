import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

function ReservationForm() {
    const { id } = useParams();
    const [reservationDetails, setreservationDetails] = useState({
        roomID:'',
        fullName: '',
        email: '',
        contactNumber: '',
        checkIn: '',
        checkOut: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setreservationDetails(prevState => ({
          ...prevState,
          [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = { ...reservationDetails, roomID: id };
            await axios.post('/reservation/booking', formData);
            console.log('Reservation added succefully');
            //reset form fields
            setreservationDetails({
                roomID:'',
                fullName: '',
                email: '',
                contactNumber: '',
                checkIn: '',
                checkOut: ''
            });

        } catch (error) {
            console.error('Error adding data',error);
        }
        
    };

    return (
        <div className="rounded-lg overflow-hidden p-6 bg-green-200 my-10 mx-60">
            <h2 className="text-5xl font-bold mb-4 text-center pt-5 pb-10 font-sans">Book your room</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                    <label className="block mb-1">Room ID:</label>
                    <input type="text" name="roomID" value={id} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded" required readOnly />
                </div>
                <div>
                    <label className="block mb-1">Full Name:</label>
                    <input type="text" name="fullName" value={reservationDetails.fullName} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded" required />
                </div>
                <div>
                    <label className="block mb-1">Email:</label>
                    <input type="email" name="email" value={reservationDetails.email} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded" required />
                </div>
                <div>
                    <label className="block mb-1">Contact Number:</label>
                    <input type="text" name="contactNumber" value={reservationDetails.contactNumber} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded" required />
                </div>
                <div className="flex space-x-4">
                    <div>
                        <label className="block mb-1">Check-in Date:</label>
                        <input type="date" name="checkIn" value={reservationDetails.checkIn} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded" required />
                    </div>
                    <div>
                        <label className="block mb-1">Check-out Date:</label>
                        <input type="date" name="checkOut" value={reservationDetails.checkOut} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded" required />
                    </div>
                </div>
                <div>
                    <button type="submit" className=" bg-green-500 text-white px-4 py-2 rounded hover:bg-black text-cyan transition ease-in-out">Proceed</button>
                </div>
            </form>
        </div>
    );
}

export default ReservationForm;
