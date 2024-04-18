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
            <section className="flex flex-col w-[200px]  my-auto text-xl bg-green-500 rounded-xl bg-opacity-20 mx-auto border border-green-500">
              <p className="flex justify-center mt-3 text-black">
                Add new package
              </p>
              <div className="justify-center m-auto my-3 max-md:px-5">
                <button
                  className=" w-[100px] h-10 bg-green-500 rounded-full border-gray-400 border mx-auto text-white text-lg font-semibold relative overflow-hidden group hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
                  onClick={() => {
                    window.location.href = `/AgencyCreatePackage/${agencyId}/null`;
                  }}
                >
                  Add
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 rotate-12 group-hover:-translate-x-40 ease"></span>
                </button>
              </div>
            </section>
          </div>
        </div>

        <h1 className="flex mt-20 ml-40 text-2xl font-semibold">
          Published Packages
        </h1>

        <div className="container grid flex-col self-center mt-10 justify-center grid-cols-2 gap-[50px] max-w-[1200px]">
          {publishedPackages.map((agencyPackage) => (
            <AgencyPackageCard
              key={agencyPackage._id}
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

        <h1 className="flex mt-20 ml-40 text-2xl font-semibold">
          Unpublished Packages
        </h1>
        <div className="container grid flex-col self-center mt-10 justify-center grid-cols-2 gap-[50px] max-w-[1200px]">
          {unPublishedPackages.map((agencyPackage) => (
            <AgencyPackageCard
              key={agencyPackage._id}
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
