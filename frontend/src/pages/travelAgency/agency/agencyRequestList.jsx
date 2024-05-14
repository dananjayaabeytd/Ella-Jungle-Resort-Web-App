import React, { useState, useEffect } from "react";
import axios from "axios";
import AgencyNewRequest from "../../../components/travelAgency/agency/agencyNewRequest";

import AgencySearch from "../../../components/travelAgency/client/agencySearch";

function AgencyRequestList({ agencyId }) {
  const [requests, setRequests] = useState([]);
  const [searchInput, setSearchInput] = useState(''); // Add this line

  // Add this function
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getRequestsByAgency/${agencyId}`)
      .then((response) => {
        setRequests(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, [agencyId]);
  

  console.log(requests);

  // * Filter requests based on status
  // * Filter requests based on status and search input
const acceptedRequests = requests.filter((request) => (request.Status === "accepted" || request.Status === "booked") && request.UserId.includes(searchInput));
const rejectedRequests = requests.filter((request) => request.Status === "rejected" && request.ArrivalDate.includes(searchInput));
const pendingRequests = requests.filter((request) => request.Status === "pending" && request.ArrivalDate.includes(searchInput));
  return (
    <div className='flex flex-col'>
      <div className='flex-1 mr-20'>
        <AgencySearch handleSearchInputChange={handleSearchInputChange} /> {/* Pass the function as a prop */}
      </div>
      <h1 className='flex justify-center my-10 ml-2 text-4xl font-semibold'>Received Requests</h1>
      <div className='container bg-gray-200 bg-opacity-80 mx-auto flex w-[1000px] border-black border flex-col rounded-xl  mb-20'>
        <div className='container mx-auto'>
          <h2 className='my-5 ml-10 text-xl font-medium'>Accepted Requests</h2>
          <div className='container px-[10px] flex-col flex'>
            {acceptedRequests.map((request) => {
              return (
                <AgencyNewRequest
                  key={request._id}
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

        <div className='container mx-auto mt-[50px] mb-10'>
          <h2 className='mb-5 ml-10 text-xl font-medium'>Pending Requests</h2>
          <div className='container px-[10px] flex-col flex'>
            {pendingRequests.map((request) => {
              return (
                <AgencyNewRequest
                  key={request._id}
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

        <div className='container mx-auto mt-[50px] mb-10'>
          <h2 className='mb-5 ml-10 text-xl font-medium'>Rejected Requests</h2>
          <div className='container px-[10px] flex-col flex'>
            {rejectedRequests.map((request) => {
              return (
                <AgencyNewRequest
                  key={request._id}
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
