import React from "react";
import AgencyDetailsProfile from "../../components/travelAgent/agencyDetailsProfile";
import AgencyRequestPackage from "../../components/travelAgent/agencyRequestPackage";
import AgencyPackageCard from "../../components/travelAgent/agencyPackageCard";



function AgencyDetails() {
	return (
	  	<div>
			<div className="flex">
			<div>
				<AgencyDetailsProfile />
			</div>
			
			<AgencyRequestPackage/>
			
		</div>

			

			<div className="flex justify-center mt-20 mb-10">
				<h1 className="flex justify-center text-4xl font-semibold"> Our Packages</h1>
			</div>
			<div className="flex justify-center">
				<div className="container grid flex-col self-center justify-center grid-cols-2 gap-[50px] max-w-[1200px]">
					<AgencyPackageCard/>
					<AgencyPackageCard/>
					<AgencyPackageCard/>
					<AgencyPackageCard/>
				</div>
			</div>
	  	</div>
	);
  }
  
export default AgencyDetails;
  