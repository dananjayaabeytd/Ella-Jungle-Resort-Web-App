import React from "react";
import AgencyDetailsSimple from "../../../components/travelAgency/client/agencyDetailsSimple";
import AgencySearch from "../../../components/travelAgency/client/agencySearch";

function AgencyList() {
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
          <AgencyDetailsSimple />
          <AgencyDetailsSimple />
          <AgencyDetailsSimple />
          <AgencyDetailsSimple />
        </div>

        <div className="flex-1 mr-20">
          <AgencySearch />
        </div>
      </div>
    </div>
  );
}

export default AgencyList;
