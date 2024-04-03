import React, { useState, useEffect } from "react";
import axios from "axios";
import AgencyPackageRoom from "./agencyPackageRoom";
import AgencyPackageActivity from "./agencyPackageActivity";
import AgencyPackageTransport from "./agencyPackageTransport";

function AgencyPackageFinal({
  selectedRoomId,
  selectedActivityId,
  selectedTransportId,
  agencyId,
}) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [packageName, setPackageName] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [commission, setCommission] = useState(0);
  const [fullDays, setFullDays] = useState(0);
  const [packageImage, setPackageImage] = useState(null);

  const handleFileChange = (e) => {
    setPackageImage(e.target.files[0]);
  };

  const handleCreatePackage = async () => {
    try {
      const formData = new FormData();
      formData.append("packageName", packageName);
      formData.append("packageImage", packageImage);
      formData.append("roomId", selectedRoomId);
      formData.append("activityId", selectedActivityId);
      formData.append("transportId", selectedTransportId);
      formData.append("packageDescription", packageDescription);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("commission", commission);
      formData.append("fullDays", fullDays);
      formData.append("agencyId", agencyId);
      formData.append("published", false); // Assuming this is the correct value
  
      const response = await axios.post(
        "http://localhost:3005/addAgencyPackage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("New package added!");
    } catch (error) {
      console.error("Error creating package:", error);
    }
  };
  



  

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/rooms/${selectedRoomId}`
        );
        setSelectedRoom(response.data);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    if (selectedRoomId) {
      fetchRoomDetails();
    }
  }, [selectedRoomId]);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/getActivityById/${selectedActivityId}`
        );
        setSelectedActivity(response.data);
      } catch (error) {
        console.error("Error fetching activity details:", error);
      }
    };

    if (selectedActivityId) {
      fetchActivityDetails();
    }
  }, [selectedActivityId]);

  useEffect(() => {
    console.log("Fetching transport details...");
    const fetchTransportDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/getTransportById/${selectedTransportId}`
        );
        console.log("Transport details response:", response.data);
        setSelectedTransport(response.data.transport);
      } catch (error) {
        console.error("Error fetching transport details:", error);
      }
    };

    if (selectedTransportId) {
      fetchTransportDetails();
    }
  }, [selectedTransportId]);

  return (
    <div>
      <div>
        {selectedRoom && (
          <AgencyPackageRoom
            roomId={selectedRoom.id}
            roomName={selectedRoom.roomName}
            image={selectedRoom.image}
            description={selectedRoom.description}
            price={selectedRoom.price}
          />
        )}

        {selectedActivity && (
          <AgencyPackageActivity
            activityId={selectedActivity.id}
            activityImage={selectedActivity.image}
            activityName={selectedActivity.name}
            description={selectedActivity.description}
            price={selectedActivity.price}
          />
        )}

        {selectedTransport && selectedTransport._id && (
          <AgencyPackageTransport
            transportId={selectedTransport._id}
            vehicleType={selectedTransport.vehicleType}
            pricePerKm={selectedTransport.pricePerKm}
            maxPassengers={selectedTransport.maxPassengers}
            image={selectedTransport.image}
            description={selectedTransport.description}
          />
        )}
      </div>
      <div>
        <h3>Enter Package Name</h3>
        <input type="text" value={packageName} onChange={(e) => setPackageName(e.target.value)} />
      </div>
      <div>
        <h3>Enter Image for Package</h3>
        <input type="file" onChange={handleFileChange}/>
      </div>
      <div>
        <h3>Enter Description for Package</h3>
        <textarea value={packageDescription} onChange={(e) => setPackageDescription(e.target.value)}></textarea>
      </div>
      <div>
        <h3>Enter Price Of Package</h3>
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      </div>
      <div>
        <h3>Enter Discount</h3>
        <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
      </div>
      <div>
        <h3>Enter Commission</h3>
        <input type="number" value={commission} onChange={(e) => setCommission(Number(e.target.value))} />
      </div>
      <div>
        <h3>Enter Full Days</h3>
        <input type="number" value={fullDays} onChange={(e) => setFullDays(Number(e.target.value))} />
      </div>
      <div>
      <button className="bg-green-200" onClick={handleCreatePackage}>create new package</button>
      </div>
    </div>
  );
}

export default AgencyPackageFinal;
