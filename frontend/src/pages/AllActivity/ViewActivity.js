
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';




// Define the ViewActivity functional component
export default function ViewActivity() {


    // Define state variables for special activities and search term
    const [specialActivities, setSpecialActivities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');



    // Fetch special activities data from the server upon component mounting
    useEffect(() => {
        function getSpecialActivities() {
            axios.get("http://localhost:8080/SpecialActivity/")
                .then((res) => {
                    setSpecialActivities(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getSpecialActivities();
    }, []);



    // Define function to handle deletion of a special activity
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this special activity?")) {
            axios.delete("http://localhost:8080/SpecialActivity/delete/" + id)
                .then(res => {
                    console.log(res);
                    window.location.reload();
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    }


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
        <div className="container mx-auto flex flex-col items-center min-h-screen bg-green-200">
        <div className="container flex flex-col items-center mt-8">

        <button type="submit" className="justify-center  px-8 py-3 mt-10 whitespace-nowrap bg-green-800 rounded-full text-white shadow-lg"
                onClick={() => window.location.href = `/add`}>
                Add Activity
        </button>

        <button type="submit" className="justify-center  px-8 py-3 mt-4 whitespace-nowrap bg-green-800 rounded-full text-white shadow-lg"
               onClick={() => window.location.href = `/allActivityReservation`}  >
                View Reservations
        </button>

        <br/>  <h1 className="text-5xl font-bold mb-4">All Special Activities</h1><br/>
            <input
                type="text"
                placeholder="Search activity"
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4 px-4 py-2 w-[450px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
        </div>
        <div className="container flex flex-wrap justify-center items-stretch mt-8">
            {filteredActivities.map((SpecialActivity, index) => (
                <div key={SpecialActivity._id} className="bg-white shadow-lg shadow-black rounded-lg p-6 mb-6 w-96 mx-4 flex flex-col justify-between">
                    {SpecialActivity.image && (
                        <img src={require(`../../assets/${SpecialActivity.image}`)} alt={SpecialActivity.name} className="mb-4 w-full" />)}
                    <div className="flex-grow">
                        <p className="text-lg font-semibold mb-2">
                            <span className="font-bold">Name:</span> {SpecialActivity.name}
                        </p>
                        <br />
                        <p className="text-lg font-normal mb-2">
                            <span className="font-bold">Description:</span> {SpecialActivity.description}
                        </p>
                        <br />
                        <p className="text-lg font-normal mb-2">
                            <span className="font-bold">Distance(km):</span> {parseFloat(SpecialActivity.distance).toFixed(2)}
                        </p>
                        <br />
                        <p className="text-lg font-normal mb-2">
                            <span className="font-bold">Price Per Person (LKR):</span> {parseFloat(SpecialActivity.price).toFixed(2)}
                        </p>
                    </div>
                    <div className="flex justify-between mt-4">
                        <Link to={`/update/${SpecialActivity._id}`} className="bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded-full">Update</Link>
                        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-full" onClick={() => handleDelete(SpecialActivity._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}