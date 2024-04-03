import React, { useState, useEffect } from "react";
import axios from "axios";
import AgencyPackageRoom from "./agencyPackageRoom";
import AgencyPackageActivity from "./agencyPackageActivity";
import AgencyPackageTransport from "./agencyPackageTransport";

function AgencyPackageFinal({
  selectedRoomId,
  selectedActivityId,
  selectedTransportId,
}) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedTransport, setSelectedTransport] = useState(null);

  console.log("selectedTransportId", selectedTransportId);
  console.log("selectedActivityId", selectedActivityId);
  console.log("selectedRoomId", selectedRoomId);

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
        <h3>Enter Image for Package</h3>
        <input type="file" />
      </div>

      <div>
        <h3>Enter Description for Package</h3>
        <textarea></textarea>
      </div>

      <div>
        <h3>Enter Price Of Package</h3>
        <input type="number" />
      </div>

      <div>
        <h3>Enter Discount</h3>
        <input type="number" />
      </div>

      <div>
        <h3>Enter Commission</h3>
        <input type="number" />
      </div>

      <div>
        <h3>Enter Full Days</h3>
        <input type="number" />
      </div>
    </div>
  );
}

export default AgencyPackageFinal;
