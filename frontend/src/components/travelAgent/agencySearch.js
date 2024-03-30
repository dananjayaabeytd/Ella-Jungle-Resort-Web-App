import React from "react";

function AgentSearch() {
  return (
    <section className="flex flex-col items-start px-5 py-6 text-sm rounded-xl bg-green-500 bg-opacity-10 w-[300px]">
      <div className="flex self-stretch text-black text-opacity-50 bg-green-500 bg-opacity-30 ext-center rounded-3xl">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d5140ec43fb6b5fa2062404bdfd9feb6fd43a52fee558d819a712540ccd749f?apiKey=bd6dc691d3624fe581379f78a6e48c90&"
          alt="Search agents icon"
          className="w-10 shrink-0 aspect-square"
        />
        <h2 className="flex justify-center flex-auto my-auto ml-[-40px] ">
          Search agents
        </h2>
      </div>
      <h3 className="mt-8 ml-5 text-black">Sort</h3>
      <div className="flex flex-col justify-center mt-4 ml-3.5 max-w-full text-xs whitespace-nowrap bg-white rounded-xl text-black text-opacity-60 w-[200px]">
        <div className="flex gap-5 justify-between px-7 py-1.5 bg-green-500 bg-opacity-30">
          <span className="my-auto">Name</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe48d8287e703bf923fe6b75c156851911b9326b823cdaaee66bc17ffd4f77f1?apiKey=bd6dc691d3624fe581379f78a6e48c90&"
            alt="Sort icon"
            className="w-5 shrink-0 aspect-square"
          />
        </div>
        <div className="flex gap-5 justify-between px-7 py-1.5 bg-green-500 bg-opacity-30">
          <span className="my-auto">Rating</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe48d8287e703bf923fe6b75c156851911b9326b823cdaaee66bc17ffd4f77f1?apiKey=bd6dc691d3624fe581379f78a6e48c90&"
            alt="Sort icon"
            className="w-5 shrink-0 aspect-square"
          />
        </div>
      </div>
    </section>
  );
}

export default AgentSearch;
