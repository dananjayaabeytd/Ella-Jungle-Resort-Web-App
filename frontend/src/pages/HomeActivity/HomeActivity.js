import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

// TopBackground component
function TopBackground() {
    return (
        <div className=" bg-black h-[500px] w-full bg-cover bg-center p-24">
            <h1 className="text-white text-4xl font-bold mt-44">Re-Connect and Celebrate <br />as a family.</h1>
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
            axios.get("http://localhost:8080/SpecialActivity/home")
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
            <div className="container mx-auto flex flex-col items-center min-h-screen w-full bg-green-200">

                {/* New small container with text */}
                <div className="relative bg-green-600 rounded-lg p-4 mb-4 w-[900px] h-[190px]" style={{ marginTop: "-90px" }}>
                    <p className="text-lg text-center text-white py-5">Ella Jungle Resort is surrounded by pristine jungles,
                        bubbling mountain springs and gushing streams.
                        Abundant with a variety of flora and fauna, Ella is nestled
                        on the banks of Kirindi Oya River which meanders
                        through Uva Province.
                        Ella is the perfect setting for the many adventure
                        activities provided or a place to be still and merge with
                        the surrounding nature. </p>
                </div>

                <div className="mt-8">

                    <h1 className="text-5xl font-bold mb-4 text-center">Special Activities</h1><br />


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


                <div className="container flex flex-wrap justify-center items-start">
                    {filteredActivities.map((SpecialActivity, index) => (
                        <Link key={SpecialActivity._id} to={`/apply/${SpecialActivity._id}`}>
                            <div className="bg-green-600 shadow-lg rounded-lg p-6 mb-6 w-96 mx-3 text-white">
                                {SpecialActivity.image && (
                                    <img src={require(`../../assets/${SpecialActivity.image}`)} alt={SpecialActivity.name} className="mb-4 " />
                                )}
                                <p className="text-2xl font-bold mb-2 ">
                                    <span className="font-bold"></span> {SpecialActivity.name}
                                </p>
                                <p className="text-lg font-normal mb-2">
                                    <span className="font-normal">Price Per Person (LKR):</span> {parseFloat(SpecialActivity.price).toFixed(2)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}