import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AgencyDetailsProfile from "../../../components/travelAgency/client/agencyDetailsProfile";
import AgencyRequestPackage from "../../../components/travelAgency/client/agencyRequestPackage";
import AgencyPackageCard from "../../../components/travelAgency/client/agencyPackageCard";

function AgencyDetails() {
  const { userId, agencyId } = useParams();
  const [agencyPackages, setAgencyPackages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgencyPackages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/getAgencyPackageByAgencyId/${agencyId}`
        );
        setAgencyPackages(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchAgencyPackages();
  }, [agencyId]);

  if (error) {
    // Handle error here, e.g., display an error message
    return <div>Error: {error.message}</div>;
  }


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
            {agencyPackages.map((agencyPackage) => (
              <AgencyPackageCard
              key={agencyPackage._id} // This should remain as the key for React's internal use
              packageId={agencyPackage._id} // Pass the package ID as a different prop
              packageName={agencyPackage.packageName}
              packageImage={agencyPackage.packageImage}
              packageDescription={agencyPackage.packageDescription}
              price={agencyPackage.price}
              fullDays={agencyPackage.fullDays}
              activityId={agencyPackage.activityId}
              roomId={agencyPackage.roomId}
              transportId={agencyPackage.transportId}
              userId={userId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgencyDetails;
