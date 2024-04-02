import React, { useState, useEffect } from "react";
import axios from "axios";
import AgencyPackageRoom from "../../../components/travelAgency/agency/agencyPackageRoom";
import AgencyPackageActivity from "../../../components/travelAgency/agency/agencyPackageActivity";
import AgencyPackageTransport from "../../../components/travelAgency/agency/agencyPackageTransport";

function AgencyCreatePackage() {
  const [activeTab, setActiveTab] = useState("Rooms");
  const [rooms, setRooms] = useState([]);
  const [activities, setActivities] = useState([]);
  const [transports, setTransports] = useState([]);


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3005/rooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms(); // Call the function here
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/getAllActivities"
        );
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchActivities(); // Call the function here
  }, []);

  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const response = await axios.get("http://localhost:3005/getAllTransports");
        console.log("Transports response:", response.data); // Log the response data
        if (Array.isArray(response.data.transports)) {
          setTransports(response.data.transports);
        } else {
          console.error("Error fetching transports: Response data is not an array");
        }
      } catch (error) {
        console.error("Error fetching transports:", error);
      }
    };
    
    fetchTransports();
  }, []);
  
  
  

  const renderTabContent = () => {
    switch (activeTab) {
      case "Rooms":
        return rooms.map((room) => (
          <AgencyPackageRoom
            key={room._id}
            roomId={room._id}
            roomName={room.roomName}
            image={room.image}
            description={room.description}
            price={room.price}
          />
        ));

      case "Special Activities":
        return activities.map((activity) => (
          <AgencyPackageActivity
            activityId={activity._id}
            activityName={activity.name}
            activityImage={activity.image}
            description={activity.description}
            price={activity.price}
          />
        ));

      case "Transport":
        return transports.map((transport) => (
          console.log("Transport:", transport),
          <AgencyPackageTransport
            transportId={transport._id}
            vehicleType={transport.vehicleType}
            pricePerKm={transport.pricePerKm}
            maxPassengers={transport.maxPassengers}
            image={transport.image}
            description={transport.description}
            agencyId={transport.agencyId}
          />
        ));

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="container w-[900px] mx-auto border border-black h-[1500px] rounded">
        <div className="container w-[900px] mx-auto">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Create your package
            </label>
            <select
              id="tabs"
              className=""
              onChange={(e) => setActiveTab(e.target.value)}
              value={activeTab}
            >
              <option>Rooms</option>
              <option>Special Activities</option>
              <option>Transport</option>
              <option>Create Package</option>
            </select>
          </div>
          <ul className="hidden text-xl font-medium text-center text-gray-900 bg-green-200 border rounded-lg drop-shadow-lg sm:flex">
            <li
              className={`w-full focus-within:z-10 ${
                activeTab === "Rooms" && "bg-green-300"
              }`}
            >
              <button
                className="inline-block w-full py-3 border-r border-gray-200 rounded-l-lg hover:text-green-500 focus:outline-none focus:bg-green-300 hover:bg-gray-50 focus:text-gray-500"
                onClick={() => setActiveTab("Rooms")}
              >
                Rooms
              </button>
            </li>
            <li
              className={`w-full focus-within:z-10 ${
                activeTab === "Special Activities" && "bg-green-300"
              }`}
            >
              <button
                className="inline-block w-full py-3 border-r border-gray-200 hover:text-green-500 hover:bg-gray-50 focus:outline-none focus:bg-green-300 focus:text-gray-500"
                onClick={() => setActiveTab("Special Activities")}
              >
                Special Activities
              </button>
            </li>
            <li
              className={`w-full focus-within:z-10 ${
                activeTab === "Transport" && "bg-green-300"
              }`}
            >
              <button
                className="inline-block w-full py-3 border-r border-gray-200 hover:text-green-500 hover:bg-gray-50 focus:outline-none focus:bg-green-300 focus:text-gray-500"
                onClick={() => setActiveTab("Transport")}
              >
                Transport
              </button>
            </li>
            <li
              className={`w-full focus-within:z-10 ${
                activeTab === "Create Package" && "bg-green-300"
              }`}
            >
              <button
                className="inline-block w-full py-3 border-0 border-gray-200 rounded-r-lg hover:text-green-500 hover:bg-gray-50 focus:outline-none focus:bg-green-300 focus:text-gray-500"
                onClick={() => setActiveTab("Create Package")}
              >
                Create Package
              </button>
            </li>
          </ul>
        </div>
        <div className="container bg-gray-100">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default AgencyCreatePackage;
