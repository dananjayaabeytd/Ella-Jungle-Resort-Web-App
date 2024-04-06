import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import ActivityBackground from '../../assets/ActivityBackground.jpg';

export default function ConfirmReservation() {
    const { id } = useParams();
    const [activityName, setActivityName] = useState("");
  

    useEffect(() => {
        axios.get(`http://localhost:8080/SpecialActivity/get/${id}`)
            .then((res) => {
                const activity = res.data.specialActivity;
                setActivityName(activity.name);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, [id]);

    const handleConfirmApply = () => {
        const data = {
            activityName: activityName
        };
        axios.post(`http://localhost:8080/ActivityReservation/confirmactivity/${id}`, data)
            .then((res) => {
                console.log("Apply confirmed successfully");
            })
            .catch((err) => {
                console.error(err.message);
            });
    }


    const handleUndo=()=>{
        if(window.confirm("Are you sure you want to undo this selection?")){
            window.location.href="/home";
        }
    }



    return (
        <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: `url(${ActivityBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="bg-green-300 bg-opacity-70 flex items-center justify-center w-full max-w-[600px] h-[500px] rounded-xl shadow-lg shadow-black py-5 px-11 text-xl font-extrabold text-black">
                
                <div className="flex flex-col w-full">
                  
                <h2 className="self-center text-4xl text-black mb-8"> Activity Selected </h2>

              
                <hr className="border-t-3 border-black w-[500px] mx-auto mt-8 mb-8"/> 
                    <p className="text-3xl font-semibold mb-2">
                        {activityName}
                    </p>
                <hr className="border-t-3 border-black w-[500px] mx-auto mt-8 mb-8"/><br /><br/>


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
