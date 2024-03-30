import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AgencyNewRequest({ key, id, arrivalDate, departureDate, sentDate }) {
  const formattedSentDate = () => {
    const date = new Date(sentDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const [allRequest, setRequest] = useState([]);

  useEffect(() => {
    function getRequests() {
      axios.get("http://localhost:3005/ClientNewRequest/")
      .then((res) => {
        getRequests(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }

    getRequests();
  }, []);

  const handleUpdateClick = (id) => {
    // Navigate to the UpdateEvent component with the event ID as a URL parameter
    window.location = `/AgencyRequestDetails/${id}`;
  };
  return (
    
    <div onClick={() => handleUpdateClick(id)}>
      <div className="flex gap-5 justify-between py-2.5 shadow-md bg-white bg-opacity-0  max-md:flex-wrap">
        <div className="flex ml-5">
          <h2 className="text-sm font-bold leading-5 text-neutral-800">
            Yasiru Pahan
          </h2>
        </div>
        <div className="flex ">
          <div className="flex text-sm ml-[-800px] min-w-[650px] max-w-[500px]">
            {/* max 60 chars */}
            <p className="flex text-gray-600">Arrival Date: {arrivalDate}</p>
            <p className="flex ml-10 text-gray-600">
              Departure Date: {departureDate}
            </p>
          </div>
          <div className="flex gap-5 ">
            <p className="" name="message sent date">
              {formattedSentDate()}
            </p>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c9b973415e6ba1bace812d7c55154ed12ed535485ab212fb6c71cbe83671982?apiKey=bd6dc691d3624fe581379f78a6e48c90&"
              alt="IconScout feature icon 2"
              className="w-5 shrink-0 aspect-square"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgencyNewRequest;
