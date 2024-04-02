import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AgencyNewRequest from "../../../components/travelAgency/agency/agencyNewRequest";

function AgencyRequestList() {
  const { agencyId } = useParams();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3005/getRequestsByAgency/${agencyId}`)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, [agencyId]);

  const newRequests = requests.filter((request) => !request.Status);
  const oldRequests = requests.filter((request) => request.Status);
  return (
    <div>
      <div className="container mx-auto flex w-[1000px] border-black border flex-col">
        <div className="container mx-auto">
          <h2 className="mb-5 text-xl">New Requests</h2>
          <div className="container px-[10px] flex-col flex">
            {newRequests.map((request) => {
              console.log("Request ID:", request._id);
              console.log("arrivalDate:", request.ArrivalDate);
              console.log("DepartureDate:", request.DepartureDate);
              console.log("SentDate:", request.SentDate);
              return (
                <AgencyNewRequest
                  requestId={request._id}
                  arrivalDate={request.ArrivalDate}
                  departureDate={request.DepartureDate}
                  sentDate={request.SentDate}
                  userId={request.UserId}
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
                  requestId={request._id}
                  arrivalDate={request.ArrivalDate}
                  departureDate={request.DepartureDate}
                  sentDate={request.SentDate}
                  userId={request.UserId}
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
