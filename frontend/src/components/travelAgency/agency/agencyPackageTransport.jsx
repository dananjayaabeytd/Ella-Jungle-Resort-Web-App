import React from "react";

function AgencyPackageTransport({ transportId, vehicleType, pricePerKm, maxPassengers, image, description, agencyId}) {
  return (
    <div>
      <div className="mx-auto bg-white  rounded-3xl border-[#4CAF50] border-t border-b max-w-[800px]">
        <div className="container flex flex-col mx-10 ">
          <div className="flex items-start my-5 ">
            <img
              className="w-40 border rounded-3xl"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/792c7ac941d0eed14463449a48a7e8eab3826f850bd35b8183438d15e0b42ad8?apiKey=bd6dc691d3624fe581379f78a6e48c90&"
              alt=""
            />

            <div className="flex flex-col items-start">
              <div className="flex pl-5 text-xl">
                <div>
                  <h1 className="pb-2 text-2xl">{vehicleType}</h1>
                  <p className="pb-2">{description}</p>
                  <p className="pb-2">{maxPassengers}</p>
                  <p className="pb-2">{pricePerKm}</p>
                </div>
              </div>
            </div>

            <div className="ml-auto">
              <button className="justify-center px-10 py-0.5 text-xl text-white bg-green-500 rounded-3xl mr-20 mt-16">
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgencyPackageTransport;
