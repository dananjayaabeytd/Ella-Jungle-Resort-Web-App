import React from "react";
import StarRating from "./agencyStarRating";  

function AgencyDetailsSimple(){
    return(
      <div className="container flex flex-col mx-5 border-t border-[#4CAF50] max-w-[780px] border-b">
        <div className="flex items-start mx-5 mt-5 ">
          <img className="ml-3 w-60 rounded-3xl"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/792c7ac941d0eed14463449a48a7e8eab3826f850bd35b8183438d15e0b42ad8?apiKey=bd6dc691d3624fe581379f78a6e48c90&"
            alt=""
          />
          
          <div className="flex flex-col items-start">
            <h1 className="self-start mb-5 ml-5 text-4xl font-semibold">Agency Name</h1>
            <div className="flex pl-5 text-xl">
              <div>
                <p className="pb-2">Reg No:</p>  
                <p className="pb-2">Licence No:</p>
                <p className="pb-2">Telephone:</p>
                <p className="pb-2">Email:</p>
                <StarRating/>
              </div>
               
              <div className="ml-10">
                <p className="pb-2">SLTDA/SQA/TA/02230</p>  
                <p className="pb-2">TA/2023/0256</p>
                <p className="pb-2">+94 123456789</p>
                <p className="pb-2">agecyemailaddress@mail.com</p>
                <button class="justify-center px-10 py-0.5 mt-4 mb-5 ml-20 text-xl text-white bg-green-500 rounded-3xl max-md:px-5">
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