import React from "react";
import AgencyNewRequest from "../../components/travelAgent/agencyNewRequest";

function AgencyRequestList() {
  return (
    <div>
      <div className="container mx-auto flex w-[1000px] border-black border flex-col">
        <div className="container mx-auto">
          <h2 className="mb-5 text-xl">New Requests</h2>
          <div className="container px-[10px]">
            <AgencyNewRequest />
            <AgencyNewRequest />
            <AgencyNewRequest />
            <AgencyNewRequest />
          </div>
        </div>

        <div className="container mx-auto mt-[50px] ">
          <h2 className="mb-5 text-xl">Old Requests</h2>
          <div className="container px-[10px]">
            <AgencyNewRequest />
            <AgencyNewRequest />
            <AgencyNewRequest />
            <AgencyNewRequest />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgencyRequestList;
