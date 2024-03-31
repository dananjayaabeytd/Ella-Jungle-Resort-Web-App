import React, { useState, useEffect } from "react";
import axios from "axios";
import AgencySentRequest from "../../../components/travelAgency/client/agencySentRequest";


function AgencySentRequestList(){
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
  
  const acceptedRequests = requests.filter((request) => request.Status);
  const rejectedRequests = requests.filter((request) => !request.Status);
  
  return (
    <div>
      <div className="container mx-auto flex w-[1000px] border-black border flex-col">
        <div className="container mx-auto">
          <h2 className="mb-5 text-xl">Accepted Requests</h2>
          <div className="container px-[10px] flex-col flex">
            {acceptedRequests.map((request) => {
              console.log("Request ID:", request.id);
              console.log("NoOfSingleRooms:", request.NoOfSingleRooms);
              console.log("NoOfDoubleRooms:", request.NoOfDoubleRooms);
              console.log("NoOfTripleRooms:", request.NoOfTripleRooms);
              console.log("NoOfAdults:", request.NoOfAdults);
              console.log("NoOfChildren:", request.NoOfChildren);
              console.log("SentDate:", request.SentDate);
              return (
                <AgencySentRequest
                  id={request.id}
                  NoOfSingleRooms={request.NoOfSingleRooms}
                  NoOfDoubleRooms={request.NoOfDoubleRooms}
                  NoOfTripleRooms={request.NoOfTripleRooms}
                  NoOfAdults={request.NoOfAdults}
                  NoOfChildren={request.NoOfChildren}
                  sentDate={request.SentDate}
                />
              );
            })}
          </div>
        </div>

        <div className="container mx-auto mt-[50px] ">
          <h2 className="mb-5 text-xl">Pending Requests</h2>
          <div className="container px-[10px] flex-col flex">
            {rejectedRequests.map((request) => {
              console.log("Request ID:", request.id);
              console.log("NoOfSingleRooms:", request.NoOfSingleRooms);
              console.log("NoOfDoubleRooms:", request.NoOfDoubleRooms);
              console.log("NoOfTripleRooms:", request.NoOfTripleRooms);
              console.log("NoOfAdults:", request.NoOfAdults);
              console.log("NoOfChildren:", request.NoOfChildren);
              console.log("SentDate:", request.SentDate);
              return (
                <AgencySentRequest
                  id={request.id}
                  NoOfSingleRooms={request.NoOfSingleRooms}
                  NoOfDoubleRooms={request.NoOfDoubleRooms}
                  NoOfTripleRooms={request.NoOfTripleRooms}
                  NoOfAdults={request.NoOfAdults}
                  NoOfChildren={request.NoOfChildren}
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

export default AgencySentRequestList;