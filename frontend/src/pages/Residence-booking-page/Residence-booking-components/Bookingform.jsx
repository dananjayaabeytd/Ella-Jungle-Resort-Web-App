import React, { useState } from 'react';

function ReservationForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        roomType: '',
        checkInDate: '',
        checkOutDate: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    return (
        <div className="rounded-lg overflow-hidden p-6 bg-green-200 my-10 mx-60">
            <h2 className="text-5xl font-bold mb-4 text-center pt-5 pb-10 font-sans">Book your room</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Full Name:</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded" required />
                </div>
                <div>
                    <label className="block mb-1">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded" required />
                </div>
                <div>
                    <label className="block mb-1">Contact Number:</label>
                    <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded" required />
                </div>
                <div>
                    <label className="block mb-1">Room Type:</label>
                    <select name="roomType" value={formData.roomType} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded" required>
                        <option value="">Select Room Type</option>
                        <option value="Eco Jungle Chalet">Eco Jungle Chalet</option>
                        <option value="Eco Jungle Cottage">Eco Jungle Cottage</option>
                        <option value="Eco Jungle Cabin">Eco Jungle Cabin</option>
                    </select>
                </div>
                <div className="flex space-x-4">
                    <div>
                        <label className="block mb-1">Check-in Date:</label>
                        <input type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded" required />
                    </div>
                    <div>
                        <label className="block mb-1">Check-out Date:</label>
                        <input type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} className="border border-gray-400 p-2 w-full rounded" required />
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
