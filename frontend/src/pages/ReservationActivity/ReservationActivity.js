import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import ActivityBackground from '../../assets/ActivityBackground.jpg';

export default function ReservationActivity() {
    // Get the id parameter from the URL
    const { id } = useParams();

    // Define state variable for special activity
    const [specialActivity, setSpecialActivity] = useState(null);

    useEffect(() => {
        function getSpecialActivity() {
            axios.get(`http://localhost:8080/SpecialActivity/apply/${id}`)
                .then((res) => {
                    setSpecialActivity(res.data.specialActivity);
                })
                .catch((err) => {
                    console.error(err.message);
                });
        }
        getSpecialActivity();
    }, [id]);

    const handleApply = () => {
        // Use window.location to navigate
        window.location.href = `/confirmactivity/${id}`;
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: `url(${ActivityBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="bg-green-600 bg-opacity-90 flex items-center justify-center w-full max-w-[600px] rounded-xl shadow-lg shadow-black py-5 px-11 text-xl font-extrabold text-white">
                {specialActivity && (
                    <div className="flex flex-col w-full">
                        {specialActivity.image && (
                            <img src={require(`../../assets/${specialActivity.image}`)} alt={specialActivity.name} className="mb-4 w-full" />
                        )}

                        <p className="text-3xl font-bold mb-2">
                            {specialActivity.name}
                        </p>

                        <br /><hr /><br />

                        <p className="text-lg font-normal mb-2">
                            {specialActivity.description}
                        </p>

                        <br /><hr /><br />

                          <p className="text-lg font-normal mb-2">
                          <span className="font-bold">Distance(km):</span> {parseFloat(specialActivity.distance).toFixed(2)}
                          </p>

                        <br /><hr /><br />

                        <p className="text-lg font-normal mb-2">
                            <span className="font-bold">Price Per Person: LKR</span> {parseFloat(specialActivity.price).toFixed(2)}
                        </p>
                        <br />

                        <button className="bg-white hover:bg-green-300 text-green-600 py-2 px-2 rounded-full w-[160px] mx-auto shadow-lg shadow-black" onClick={handleApply}>
                            Apply
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
}
