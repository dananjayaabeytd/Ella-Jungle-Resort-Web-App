import React, { useState, useEffect } from "react";
import axios from "axios";
import AgencyNewRequest from "../../../components/travelAgent/agencyNewRequest";

function AgencyRequestList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3005/ClientNewRequest")
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, []);

  const newRequests = requests.filter((request) => request.Status);
  const oldRequests = requests.filter((request) => !request.Status);
  return (
    <div>
      <div className="container mx-auto flex w-[1000px] border-black border flex-col">
        <div className="container mx-auto">
          <h2 className="mb-5 text-xl">New Requests</h2>
          <div className="container px-[10px] flex-col flex">
            {newRequests.map((request) => {
              console.log("Request ID:", request.id);
              console.log("arrivalDate:", request.ArrivalDate);
              console.log("DepartureDate:", request.DepartureDate);
              console.log("SentDate:", request.SentDate);
              return (
                <AgencyNewRequest
                  key={request.id}
                  id={request.id}
                  arrivalDate={request.ArrivalDate}
                  departureDate={request.DepartureDate}
                  sentDate={request.SentDate}
                />
              );
            })}
          </div>
        </div>

        <div className="container mx-auto mt-[50px] ">
          <h2 className="mb-5 text-xl">Old Requests</h2>
          <div className="container px-[10px] flex-col flex">
            {oldRequests.map((request) => {
              console.log("Request ID:", request.id);
              console.log("arrivalDate:", request.ArrivalDate);
              console.log("DepartureDate:", request.DepartureDate);
              console.log("SentDate:", request.SentDate);
              return (
                <AgencyNewRequest
                  key={request.id}
                  id={request.id}
                  arrivalDate={request.ArrivalDate}
                  departureDate={request.DepartureDate}
                  sentDate={request.SentDate}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgencyRequestList;
