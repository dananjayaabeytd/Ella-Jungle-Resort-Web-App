import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ActivityBackground from '../../assets/ActivityBackground.jpg';

export default function ConfirmReservation() {
    const { id } = useParams();
    const [activityName, setActivityName] = useState("");
    const [activityPrice, setActivityPrice] = useState(0);
    const [noOfPeople, setNoOfPeople] = useState(1); // Default number of people
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/SpecialActivity/get/${id}`)
            .then((res) => {
                const activity = res.data.specialActivity;
                setActivityName(activity.name);
                setActivityPrice(activity.price);
                // Calculate initial total price based on default number of people
                setTotalPrice(activity.price * noOfPeople);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, [id, noOfPeople]);

    const handleNoOfPeopleChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setNoOfPeople(value);
        }
    };

    const handleConfirmApply = () => {
        const data = {
            activityName: activityName,
            noOfPeople: noOfPeople,
            activityPrice: activityPrice,
            totalPrice: totalPrice
        };
        axios.post(`http://localhost:8080/ActivityReservation/confirmactivity/${id}`, data)
            .then((res) => {
                console.log("Apply confirmed successfully");
                navigate("/home");
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    const handleUndo = () => {
        if(window.confirm("Are you sure you want to undo this selection?")){
            window.location.href="/home";
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: `url(${ActivityBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="bg-green-300 bg-opacity-70 flex items-center justify-center w-full max-w-[600px] h-[800px] rounded-xl shadow-lg shadow-black py-5 px-11 text-xl font-extrabold text-black">
                <div className="flex flex-col w-full">
                    <h2 className="self-center text-4xl text-black mb-8"> Activity Selected </h2>
                    <br/>
                    <p className="text-3xl font-semibold mb-2">
                        {activityName}
                    </p>
                    <hr className="border-t-3 border-black w-[500px] mx-auto mt-8 mb-8"/>
                    <p className="text-3xl font-semibold mb-2">
                        Price: Rs.{activityPrice}
                    </p>
                    <hr className="border-t-3 border-black w-[500px] mx-auto mt-8 mb-8"/>
                    <label className="text-3xl font-semibold mb-2">Number of People:</label>
                    <input
                        type="number"
                        className="text-2xl px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 w-[100px]"
                        value={noOfPeople}
                        onChange={handleNoOfPeopleChange}
                    />
                    <hr className="border-t-3 border-black w-[500px] mx-auto mt-8 mb-8"/>
                    <label className="text-3xl font-semibold mb-2">Total Price: Rs.{totalPrice}</label>
                    <hr className="border-t-3 border-black w-[500px] mx-auto mt-8 mb-8"/><br/>
                    <div className="flex justify-between">
                        <button className="bg-red-600 hover:bg-red-500 text-white py-2 px-2 rounded-full w-[160px] mx-auto shadow-lg shadow-black"
                                onClick={handleUndo}>
                            Undo Selection
                        </button>
                        <button className="bg-green-600 hover:bg-green-500 text-white py-2 px-2 rounded-full w-[160px] mx-auto shadow-lg shadow-black" onClick={handleConfirmApply}>
                            Confirm Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
