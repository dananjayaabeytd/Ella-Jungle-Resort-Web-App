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

  const publishedPackages = agencyPackages.filter(
    (agencyPackage) => agencyPackage.published
  );
  const unPublishedPackages = agencyPackages.filter(
    (agencyPackage) => !agencyPackage.published
  );

  return (
    <div>
      <div className="flex flex-col justify-center mt-20 mb-10">
        <div>
          <h1 className="flex justify-center text-4xl font-semibold">
            My Packages
          </h1>

          <div className="mx-auto mt-[50px]">
            <section className="flex flex-col w-[250px] px-8 py-5 my-auto text-xl bg-green-500 rounded-xl bg-opacity-20 mx-auto">
              <p className="flex justify-center text-black">Add new package</p>
              <div className="flex justify-center">
                <button
                  className="flex justify-center px-5 py-2 mt-4 text-center text-white bg-green-500 rounded-2xl"
                  onClick={() => {
                    window.location.href = `/AgencyCreatePackage/${agencyId}`;
                  }}
                >
                  Add
                </button>
              </div>
            </section>
          </div>
        </div>

        <h1 className="flex mt-20 ml-40 text-2xl font-semibold">
          {" "}
          Published Packages{" "}
        </h1>

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

        <h1 className="flex mt-20 ml-40 text-2xl font-semibold">
          {" "}
          Published Packages{" "}
        </h1>
        <div className="container grid flex-col self-center mt-10 justify-center grid-cols-2 gap-[50px] max-w-[1200px]">
          {unPublishedPackages.map((agencyPackage) => (
            <AgencyPackageCard
              packageId={agencyPackage._id}
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
