import React from "react";

function AgencyPackageCard() {
	return (
		<section className="w-full px-5 py-5 bg-white border border-black border-solid grow rounded-xl max-md:pl-5 max-md:mt-10 max-md:max-w-full">
			<div className="flex gap-5 max-md:flex-col max-md:gap-0">
			<figure className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full">
				<img
				loading="lazy"
				src="https://cdn.builder.io/api/v1/image/assets/TEMP/1193d89decabd3d02fed1b4162007972b6719e59c6a805b1c7a5fa66e668c8c8?apiKey=bd6dc691d3624fe581379f78a6e48c90&"
				alt=""
				className="grow w-full aspect-[0.86] max-md:mt-9"
				/>
			</figure>
			<div className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full">
				<div className="flex flex-col self-stretch my-auto font-bold max-md:mt-10">
				<h2 className="text-3xl text-black text-opacity-80">Package Name</h2>
				<ul className="text-xs text-black mt-11 text-opacity-60 max-md:mt-10">
					
					<li>5 days</li>
					<li>Special id</li>
					<li>Room id</li>
					<li>transport id</li>
					<li>description</li>
				</ul>
				<p className="text-2xl text-green-600 mt-7">LKR 50,000</p>
				<button className="justify-center px-14 py-2.5 mt-5 text-sm text-center text-white bg-green-500 rounded-2xl max-md:px-5">
					Book Now
				</button>
				</div>
			</div>
			</div>
		</section>
	);
  }

  export default AgencyPackageCard;