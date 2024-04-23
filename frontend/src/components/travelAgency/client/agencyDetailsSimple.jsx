import React from "react";
import StarRating from "./agencyStarRating";
import NoImage from "../../../assets/agencyImages/No_Image";

function AgencyDetailsSimple({
  agencyId,
  agencyName,
  businessRegistrationNumber,
  address,
  mobile,
  businessMail,
  rating,
  userId,
  img,
}) {

  const handleDetailsClick = (agencyId, userId) => {
    window.location.href = `/AgencyDetails/${userId}/${agencyId}`;
  };

  return (
    <div className="container flex flex-col mx-5  border-green-600 max-w-[780px] border bg-gray-200 rounded-[20px] bg-opacity-50 mb-6">
      <div className="flex items-start mx-5 mt-5 ">
        <img
          className="ml-3 w-60 rounded-3xl"
          src={require(`../../../assets/agencyImages/${img || "No_Image"}`)}
          alt={img}
          onError={(e) => {
            e.target.src = NoImage; // Set image source to default image if original image not found
          }}
        />

        <div className="flex flex-col items-start">
          <h1 className="self-start mb-5 ml-5 text-4xl font-semibold">
            {agencyName}
          </h1>
          <div className="flex pl-5 text-xl">
            <div>
              <p className="pb-2">Reg No:</p>
              <p className="pb-2">Address:</p>
              <p className="pb-2">Telephone:</p>
              <p className="pb-2">Email:</p>
              <StarRating />
            </div>

            <div className="ml-10">
              <p className="pb-2">{businessRegistrationNumber}</p>
              <p className="pb-2">{address}</p>
              <p className="pb-2">{mobile}</p>
              <p className="pb-2">{businessMail}</p>
              <button
                className="justify-center px-10 py-0.5 mt-4 mb-5 ml-20 text-xl text-white bg-green-500 rounded-3xl max-md:px-5"
                onClick={() => handleDetailsClick(agencyId, userId)}
              >
                More Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgencyDetailsSimple;