import React from "react";
import StarRating from "./agencyStarRating";

function AgencyDetailsProfile() {
    return (
        <div className="container flex flex-col min-h-[350px] mx-20 mt-3">
				<h1 className="self-start mt-3 mb-5 ml-3 text-4xl font-semibold">Agency Name</h1>
				<div className="flex items-start">
					<img className="ml-3 w-72 h-72 rounded-3xl"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/792c7ac941d0eed14463449a48a7e8eab3826f850bd35b8183438d15e0b42ad8?apiKey=bd6dc691d3624fe581379f78a6e48c90&"
						alt=""
					/>
					<div className="flex flex-col items-start">
						<div className="flex pl-5 text-xl">
							<div>
								<p className="pb-4">Reg No:</p>  
								<p className="pb-4">Licence No:</p>
								<p className="pb-4">Address:</p>
								<p className="pb-4">Telephone:</p>
								<p className="pb-4">Email:</p>
								<StarRating/>
							</div>
							<div className="ml-10">
								<p className="pb-4">SLTDA/SQA/TA/02230</p>  
								<p className="pb-4">TA/2023/0256</p>
								<p className="pb-4">23/C, Galle Road, Colombo</p>
								<p className="pb-4">+94 123456789</p>
								<p className="pb-4">agecyemailaddress@mail.com</p>
							</div>
						</div>
						<div className="flex pl-5 mt-5 max-w-[700px]">
							<p>Curate your Sri Lankan adventure with our Ella Jungle resort promotions. Escape for a short break to explore the island’s highlights,or leisurely sample all its wonders.</p>
						</div>
						<div className="flex gap-5 mt-5 ml-5">
							<a href="facebook.com">
								<img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e554f3583ab683cda87bc919720bac4db0578a18c5a864f04c398686f5e83077?apiKey=bd6dc691d3624fe581379f78a6e48c90&" alt="facebook" className=" max-w-[50px]" />
							</a>
							<a href="facebook.com">
								<img src="https://cdn.builder.io/api/v1/image/assets/TEMP/24d3dc882006ce9cc71830a0bc085fc2352963a4639e40d3c5695fdea8b352ac?apiKey=bd6dc691d3624fe581379f78a6e48c90&" alt="facebook" className=" max-w-[50px]" />
							</a>
						</div>
						
					</div>
				</div>
			</div>
    );
}


export default AgencyDetailsProfile;