import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import HomeBackground from '../../assets/HomeBackground.jpg';
//import ActivityMap from "./ActivityMap";


// TopBackground component
function TopBackground() {
    return (
        <div className=" bg-black h-[600px] w-full bg-cover bg-center p-24" style={{ backgroundImage: `url(${HomeBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h1 className="text-4xl font-bold text-white mt-44 ">Re-Connect and Celebrate <br />as a family.</h1>
        </div>
    );
}


// Define the HomeActivity functional component
export default function HomeActivity() {


    // Define state variables for special activities and search term
    const [specialActivities, setSpecialActivities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');



    // Fetch special activities data from the server upon component mounting
    useEffect(() => {
        function getSpecialActivities() {
            axios.get("http://localhost:5000/SpecialActivity/home")
                .then((res) => {
                    setSpecialActivities(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getSpecialActivities();
    }, []);




    // Define function to handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }


    // Filter special activities based on search term
    const filteredActivities = specialActivities.filter(activity =>
        activity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // Render the component JSX
    return (

        <div className="flex flex-col min-h-screen">
            <TopBackground />
            <div className="container flex flex-col items-center w-full min-h-screen mx-auto bg-green-200">

                {/* New small container with text */}
                <div className="relative bg-green-800 rounded-lg p-4 mb-4 w-[900px] h-[190px] shadow-lg shadow-black" style={{ marginTop: "-90px" }}>
                    <p className="py-5 text-lg text-center text-white">Ella Jungle Resort is surrounded by pristine jungles,
                        bubbling mountain springs and gushing streams.
                        Abundant with a variety of flora and fauna, Ella is nestled
                        on the banks of Kirindi Oya River which meanders
                        through Uva Province.
                        Ella is the perfect setting for the many adventure
                        activities provided or a place to be still and merge with
                        the surrounding nature. </p>
                </div>

                <div className="mt-8">

                    <h1 className="mb-4 text-5xl font-bold text-center">Special Activities</h1><br />


                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search activity"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="px-20 w-[800px] py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                </div>


                <br /> <br />


                <div className="container flex flex-wrap items-start justify-center">
                    {filteredActivities.map((SpecialActivity, index) => (
                        <Link key={SpecialActivity._id} to={`/activity/apply/${SpecialActivity._id}`}>
                            <div className="p-6 mx-3 mb-6 text-white bg-green-800 rounded-lg shadow-lg shadow-black w-96">
                                {SpecialActivity.image && (
                                    <img src={require(`../../assets/${SpecialActivity.image}`)} alt={SpecialActivity.name} className="mb-4 " />
                                )}
                                <p className="mb-2 text-2xl font-bold ">
                                    <span className="font-bold"></span> {SpecialActivity.name}
                                </p>
                                <p className="mb-2 text-lg font-normal">
                                    <span className="font-normal">Price Per Person : Rs.</span> {parseFloat(SpecialActivity.price).toFixed(2)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
               
            </div>
        </div>
    );
}