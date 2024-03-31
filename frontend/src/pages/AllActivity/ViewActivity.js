
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function ViewActivity() {
    const [specialActivities, setSpecialActivities] = useState([]);
    const [searchTerm, setSearchTerm]=useState('');

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


   
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const filteredActivities = specialActivities.filter(activity =>
        activity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="container mx-auto flex flex-col items-center  min-h-screen">

            <button type="submit" className="justify-center self-center px-8 py-3 mt-14 whitespace-nowrap bg-green-800 rounded-full text-white shadow-lg"
                onClick={() => window.location.href = `/add`}>
                Add Activity
            </button>

            <div className="container flex flex-col items-center mt-8">
                <h1 className="text-3xl font-semibold mb-4">All Special Activities</h1>
                <input
                    type="text"
                    placeholder="Search activity"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <br/>
                {filteredActivities.map((SpecialActivity) => (
                    <div key={SpecialActivity._id} className="bg-white shadow-lg rounded-lg p-6 mb-6 w-96">
                        <p className="text-lg font-semibold mb-2">Name: {SpecialActivity.name}</p>
                        <p className="text-sm mb-2">Description: {SpecialActivity.description}</p>
                        <p className="text-sm mb-2">Price: {SpecialActivity.price}</p>
                        <div className="flex mt-2">
                            <Link to={`/update/${SpecialActivity._id}`} className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-full mr-2">Update</Link>
                            <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-full" onClick={() => handleDelete(SpecialActivity._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}