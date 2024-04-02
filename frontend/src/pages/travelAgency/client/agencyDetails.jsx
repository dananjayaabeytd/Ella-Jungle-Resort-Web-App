import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AgencyDetailsProfile from "../../../components/travelAgency/client/agencyDetailsProfile";
import AgencyRequestPackage from "../../../components/travelAgency/client/agencyRequestPackage";
import AgencyPackageCard from "../../../components/travelAgency/client/agencyPackageCard";

function AgencyDetails() {
  const { userId, agencyId } = useParams();

  console.log("User ID:", userId);

  return (
    <div>
      <div className="flex">
        <div>
          <AgencyDetailsProfile agencyId={agencyId} />
        </div>

        <AgencyRequestPackage userId={userId} agencyId={agencyId} />
      </div>
      <div>
        <div className="flex justify-center mt-20 mb-10">
          <h1 className="flex justify-center text-4xl font-semibold">
            Our Packages
          </h1>
        </div>
        <div className="flex justify-center">
          <div className="container grid flex-col self-center justify-center grid-cols-2 gap-[50px] max-w-[1200px]">
            <AgencyPackageCard />
            <AgencyPackageCard />
            <AgencyPackageCard />
            <AgencyPackageCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgencyDetails;
