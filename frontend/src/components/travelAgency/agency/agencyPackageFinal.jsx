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
    // Check if a room is selected
    if (!selectedRoomId) {
      alert("Please select a room.");
      return;
    }

    // Check if packageName is empty
    if (!packageName.trim()) {
      alert("Please enter package name");
      return;
    }

    // If an image is not selected, set it to null
    const packageImageData = packageImage ? packageImage : null;

    try {
      const formData = new FormData();
      formData.append("packageName", packageName);
      formData.append("packageImage", packageImageData);
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

  const updatePrice = () => {
    // Calculate the package price
    const packagePrice =
      selectedRoom.price +
      selectedActivity.price +
      selectedTransport.pricePerKm;

    // Calculate commission and discount values
    const commissionValue = (commission / 100) * packagePrice;
    const discountValue = (discount / 100) * packagePrice;

    // Calculate the final price
    const finalPrice = packagePrice + commissionValue - discountValue;

    // Update the price state
    setPrice(finalPrice);
  };

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
        <input
          type="text"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          required
        />
      </div>
      <div>
        <h3>Enter Image for Package</h3>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <h3>Enter Description for Package</h3>
        <textarea
          value={packageDescription}
          onChange={(e) => setPackageDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <h3>Enter Full Days</h3>
        <input
          type="number"
          value={fullDays}
          onChange={(e) => setFullDays(Number(e.target.value))}
        />
      </div>
      <div>
        <h3>Enter Discount</h3>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />
      </div>
      <div>
        <h3>Enter Commission</h3>
        <input
          type="number"
          value={commission}
          onChange={(e) => setCommission(Number(e.target.value))}
        />
      </div>

      <div>
        <h3>Enter Price Of Package</h3>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button onClick={updatePrice}>Update price</button>
      </div>

      <button
        className="mx-20 mb-10 w-[200px] h-10 bg-green-400 rounded-full text-white text-lg font-semibold relative overflow-hidden group hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
        type="submit"
        onClick={handleCreatePackage}
      >
        Create Package
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      </button>
    </div>
  );
}

export default AgencyPackageFinal;
