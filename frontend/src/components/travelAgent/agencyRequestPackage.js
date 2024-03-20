import React from "react";

function AgencyRequestPackage() {
  return (
    <div className="mr-[50px] mt-[100px]">
		<section className="flex flex-col w-[300px] px-8 py-5 my-auto text-xl bg-green-500 rounded-xl bg-opacity-20 ">
		    <p className="flex justify-center text-black">Request new package</p>
			<div className="flex justify-center">
				<button className="flex justify-center px-5 py-3 mt-4 text-center text-white bg-green-500 rounded-2xl">
					Send a Request
				</button>
			</div>
		</section>
	</div>
  );
  }

  export default AgencyRequestPackage;