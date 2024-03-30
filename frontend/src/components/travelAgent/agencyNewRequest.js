import React from "react";

function AgencyNewRequest() {
  return (
    <div className="flex gap-5 justify-between py-2.5 shadow-md bg-white bg-opacity-0  max-md:flex-wrap">
      <div className="flex ml-5">
        <h2 className="text-sm font-bold leading-5 text-neutral-800">
          Yasiru Pahan
        </h2>
      </div>
      <div className="flex ">
        <div className="flex text-sm ml-[-800px] min-w-[650px] max-w-[500px]">
          <p className="flex text-gray-600">
            Over 700K icons fonts, Prompt to Vector, Easter
          </p>
        </div>
        <div className="flex gap-5 ">
          <p>12 Sept</p>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c9b973415e6ba1bace812d7c55154ed12ed535485ab212fb6c71cbe83671982?apiKey=bd6dc691d3624fe581379f78a6e48c90&"
            alt="IconScout feature icon 2"
            className="w-5 shrink-0 aspect-square"
          />
        </div>
      </div>
    </div>
  );
}

export default AgencyNewRequest;