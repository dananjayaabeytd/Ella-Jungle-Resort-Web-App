import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AgencyDetailsSimple from "../../../components/travelAgency/client/agencyDetailsSimple";
import AgencySearch from "../../../components/travelAgency/client/agencySearch";

function AgencyList() {
  const { clientId } = useParams();

  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/getAllAgencies"
        );
        setAgencies(response.data);
      } catch (error) {
        console.error("Error fetching agencies:", error);
      }
    };

    fetchAgencies();
  }, []);

  return (
    <div>
      <div className="relative">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4679ea9add8d1b500755cddc88572db5b5edc0e21c1eb1fca547dd90b914ba02?apiKey=bd6dc691d3624fe581379f78a6e48c90&"
          alt="Travel Agents"
          className="w-full"
        />
        <div className="absolute bottom-0 left-0 w-full text-center text-white">
          <h1 className="pb-5 text-6xl">Travel Agents</h1>
        </div>
      </div>

      <div className="flex mt-5 ml-10">
        <div className="container flex-col justify-center mx-auto ">
          {agencies.map((agency) => {
            console.log("Agency ID:", agency.id);
            console.log("Agency Name:", agency.agencyName);
            console.log("Agency Address:", agency.address);
            console.log("Agency Mobile:", agency.mobile);
            console.log("Agency Business Mail:", agency.businessMail);
            console.log("Agency Fax:", agency.fax);
            console.log("Agency Rating:", agency.rating);
            console.log("Client ID", clientId);

            return (
              <AgencyDetailsSimple
                agencyId={agency.id}
                agencyName={agency.agencyName}
                businessRegistrationNumber={agency.businessRegistrationNumber}
                address={agency.address}
                mobile={agency.mobile}
                businessMail={agency.businessMail}
                rating={agency.rating}
                clientId={clientId} // Pass clientId here
              />
            );
          })}
        </div>

        <div className="flex-1 mr-20">
          <AgencySearch />
        </div>
      </div>
    </div>
  );
}

export default AgencyList;
