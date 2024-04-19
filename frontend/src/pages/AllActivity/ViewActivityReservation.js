import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";



// Define a separate Table component
const Table = ({ activityReservations }) => (
    <table className="table-auto w-full">

        <thead className="bg-green-600">
            <tr>
                <th className="px-4 py-2">Activity ID</th>
                <th className="px-4 py-2">Guest ID</th>
                <th className="px-4 py-2">Activity Name</th>
                <th className="px-4 py-2">No. of People</th>
                <th className="px-4 py-2">Activity Price</th>
                <th className="px-4 py-2">Total Price</th>
            </tr>
        </thead>

        <tbody>
            {activityReservations.map((reservation) => (
                <tr key={reservation._id}>
                    <td className="border px-4 py-2">{reservation.activityID}</td>
                    <td className="border px-4 py-2">{reservation.guestID}</td>
                    <td className="border px-4 py-2">{reservation.activityName}</td>
                    <td className="border px-4 py-2">{reservation.noOfPeople}</td>
                    <td className="border px-4 py-2">{reservation.activityPrice}</td>
                    <td className="border px-4 py-2">{reservation.totalPrice}</td>
                </tr>
            ))}
        </tbody>
    </table>
);



// Define the ViewActivityReservation functional component
export default function ViewActivityReservation() {

    // Define state variable for activity reservations
    const [activityReservations, setActivityReservations] = useState([]);

    // Fetch activity reservations from the server upon component mounting
    useEffect(() => {
        axios.get("http://localhost:8080/ActivityReservation/allActivityReservation")
            .then((res) => {
                setActivityReservations(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);





    const tableRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => tableRef.current,
        documentTitle: "Activity Reservations Report",
        onAfterPrint: () => {
            alert("Activity Reservations Report Successfully Downloaded!");
        }
    });


    

    // Render the component JSX
    return (
        <div className="container mx-auto mt-8 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">All Activity Reservations</h2>
            
            <div ref={tableRef} className="py-8">
                <Table activityReservations={activityReservations} />
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 mt-14 rounded-full" onClick={handlePrint}> Download Report</button>
        </div>
    );
}


