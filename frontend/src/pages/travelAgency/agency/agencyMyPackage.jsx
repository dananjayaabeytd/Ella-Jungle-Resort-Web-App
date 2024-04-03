import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AgencyPackageCard from "../../../components/travelAgency/client/agencyPackageCard";

function AgencyMyPackage() {
  const { agencyId } = useParams();
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

  const publishedPackages = agencyPackages.filter((agencyPackage) => agencyPackage.published);
  const unPublishedPackages = agencyPackages.filter((agencyPackage) => !agencyPackage.published);

  return (
    <div>
      <div className="flex flex-col justify-center mt-20 mb-10">
        <div>
          <h1 className="flex justify-center text-4xl font-semibold">
            My Packages
          </h1>
        </div>

        <h1 className="flex mt-20 ml-40 text-2xl font-semibold"> Published Packages </h1>

        <div className="container grid flex-col self-center mt-10 justify-center grid-cols-2 gap-[50px] max-w-[1200px]">
          {publishedPackages.map((agencyPackage) => (
            <AgencyPackageCard
              key={agencyPackage._id}
              packageName={agencyPackage.packageName}
              packageImage={agencyPackage.packageImage}
              packageDescription={agencyPackage.packageDescription}
              price={agencyPackage.price}
              fullDays={agencyPackage.fullDays}
              activityId={agencyPackage.activityId}
              roomId={agencyPackage.roomId}
              transportId={agencyPackage.transportId}
            />
          ))}
        </div>

        <h1 className="flex mt-20 ml-40 text-2xl font-semibold"> Published Packages </h1>
        <div className="container grid flex-col self-center mt-10 justify-center grid-cols-2 gap-[50px] max-w-[1200px]">
          {unPublishedPackages.map((agencyPackage) => (
            <AgencyPackageCard
              key={agencyPackage._id}
              packageName={agencyPackage.packageName}
              packageImage={agencyPackage.packageImage}
              packageDescription={agencyPackage.packageDescription}
              price={agencyPackage.price}
              fullDays={agencyPackage.fullDays}
              activityId={agencyPackage.activityId}
              roomId={agencyPackage.roomId}
              transportId={agencyPackage.transportId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AgencyMyPackage;
