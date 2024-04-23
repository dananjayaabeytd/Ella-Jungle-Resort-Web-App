import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AgencyPackageCard from "../../../components/travelAgency/client/agencyPackageCard";
import AgencyPackageSearch from "../../../components/travelAgency/agency/agencyPackageSearch";

function AgencyMyPackage() {
  const { agencyId } = useParams();
  const [agencyPackages, setAgencyPackages] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredPublishedPackages, setFilteredPublishedPackages] = useState([]);
  const [filteredUnpublishedPackages, setFilteredUnpublishedPackages] = useState([]);

  // * Fetching agency packages
  useEffect(() => {
    const fetchAgencyPackages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/getAgencyPackageByAgencyId/${agencyId}`
        );
        setAgencyPackages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAgencyPackages();
  }, [agencyId]);

  // Filter published and unpublished packages
  useEffect(() => {
    const filteredPublished = agencyPackages.filter((agencyPackage) => agencyPackage.published);
    setFilteredPublishedPackages(filteredPublished);

    const filteredUnpublished = agencyPackages.filter((agencyPackage) => !agencyPackage.published);
    setFilteredUnpublishedPackages(filteredUnpublished);
  }, [agencyPackages]);

  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Handle sort order change
  const handleSortChange = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  return (
    <div>
      <div className='flex flex-col justify-center mt-20 mb-10'>
        <div>
          <h1 className='flex justify-center text-4xl font-semibold'>My Packages</h1>

          <div className='flex flex-col'>
            <div className=' flex flex-col mx-auto mt-[50px]'>
              <section className='flex flex-col w-[200px]  my-auto text-xl bg-green-500 rounded-xl bg-opacity-20 mx-auto border border-green-500'>
                <p className='flex justify-center mt-3 text-black'>Add new package</p>
                <div className='justify-center m-auto my-3 max-md:px-5'>
                  <button
                    className=' w-[100px] h-10 bg-green-500 rounded-full border-gray-400 border mx-auto text-white text-lg font-semibold relative overflow-hidden group hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300'
                    onClick={() => {
                      window.location.href = `/AgencyCreatePackage/${agencyId}/null`;
                    }}
                  >
                    Add
                    <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 rotate-12 group-hover:-translate-x-40 ease'></span>
                  </button>
                </div>
              </section>
            </div>
            <div className='flex flex-col'>
              <AgencyPackageSearch
                handleSearchInputChange={handleSearchInputChange}
                handleSortChange={handleSortChange}
                sortOrder={sortOrder}
              />
            </div>
          </div>
        </div>

        <h1 className='flex mt-20 ml-40 text-2xl font-semibold'>Published Packages</h1>

        <div className='container grid flex-col self-center mt-10 justify-center grid-cols-2 gap-[50px] max-w-[1200px]'>
          {filteredPublishedPackages
            .filter((agencyPackage) =>
              agencyPackage.packageName.toLowerCase().includes(searchInput.toLowerCase())
            )
            .sort((a, b) =>
              sortOrder === "asc"
                ? a.packageName.localeCompare(b.packageName)
                : b.packageName.localeCompare(a.packageName)
            )
            .map((agencyPackage) => (
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

        <h1 className='flex mt-20 ml-40 text-2xl font-semibold'>Unpublished Packages</h1>
        <div className='container grid flex-col self-center mt-10 justify-center grid-cols-2 gap-[50px] max-w-[1200px]'>
          {filteredUnpublishedPackages
            .filter((agencyPackage) =>
              agencyPackage.packageName.toLowerCase().includes(searchInput.toLowerCase())
            )
            .sort((a, b) =>
              sortOrder === "asc"
                ? a.packageName.localeCompare(b.packageName)
                : b.packageName.localeCompare(a.packageName)
            )
            .map((agencyPackage) => (
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
