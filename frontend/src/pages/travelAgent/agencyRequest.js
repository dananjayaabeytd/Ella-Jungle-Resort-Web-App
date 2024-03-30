import React from "react";

function AgencyRequest() {
  return(
    <div className="container my-10 flex flex-col mx-auto bg-green-500 border border-black bg-opacity-20 max-w-[1000px] rounded-lg">
        <div className="mt-3 text-2xl text-center">
          <h1>Request new reservation</h1>
        </div>

        <div className="flex mx-auto mt-10">
          <form>
            <div className="flex items-start form-group">
              <div className="flex flex-col mx-20 text-xl">
                <div className="flex items-start mb-2 ">
                  <label>Arrival Date</label>
                  <input
                    type="date"
                    id="arrivalDate"
                    className="ml-[92px] rounded-lg"
                    placeholder=""
                  />
                </div>
                <div className="flex items-start mb-2">
                  <label>Departure Date</label>
                  <input
                    type="date"
                    className="ml-[59px] rounded-lg "
                    id="departureDate"
                  />
                </div>
                <div className="flex items-start mb-2">
                  <label>Number of Days</label>
                  <input
                    type="number"
                    className="ml-[51px] w-20 rounded-lg"
                    id="noOfdays"
                  />
                </div>
                <div className="flex items-start mb-2">
                  <label>Number of Nights</label>
                  <input
                    type="number"
                    className="ml-[35px] w-20 rounded-lg"
                    id="noOfNights"
                  />
                </div>
                <div className="flex items-start mb-2">
                  <label>Number of Adults</label>
                  <input
                    type="number"
                    className="ml-[37px] w-20 rounded-lg"
                    id="noOfAdults"
                  />
                </div>
                <div className="flex items-start mb-2">
                  <label>Number of Children</label>
                  <input
                    type="number"
                    className="w-20 ml-[20px] rounded-lg"
                    id="noOfChuldren"
                  />
                </div>
              </div>

              <div className="flex flex-col mx-20 mt-[-5px] text-xl">
                <div className="flex ml-20">Room</div>
                <div className="flex items-start mb-1 ">
                  <label>Single Bed</label>
                  <input
                    type="number"
                    className="ml-[75px] w-20 rounded-lg"
                    id="singleBed"
                  />
                </div>
                <div className="flex items-start mb-1">
                  <label>Double Bed</label>
                  <input
                    type="number"
                    className="ml-[65px] w-20 rounded-lg"
                    id="doubleBed"
                  />
                </div>
                <div className="flex items-start mb-1">
                  <label>Triple Bed</label>
                  <input
                    type="number"
                    className="ml-[80px] w-20 rounded-lg"
                    id="tripleBed"
                  />
                </div>
                <div className="flex mt-2 ml-20">Meal</div>
                <div className="flex items-start mb-1">
                  <label>Breakfast</label>
                  <input
                    type="number"
                    className="ml-[88px] w-20 rounded-lg"
                    id="Breakfast"
                  />
                </div>
                <div className="flex items-start mb-1">
                  <label>Lunch</label>
                  <input
                    type="number"
                    className="ml-[116px] w-20 rounded-lg"
                    id="lunch"
                  />
                </div>
                <div className="flex items-start mb-1">
                  <label>Dinner</label>
                  <input
                    type="number"
                    className="w-20 ml-[110px] rounded-lg"
                    id="Dinner"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col mx-20 mb-10">
              <div>
                <label className="text-xl">Sepcial Requests:</label>
              </div>
              <div>
                <input
                  type="text"
                  className="w-[750px] max-h-[100px] h-[100px] rounded-lg"
                />
              </div>
            </div>
            <div>
              <button
                id="spRequest"
                className="mx-20 mb-10 w-[200px] h-10 bg-green-400 rounded-full text-white text-lg font-semibold"
              >
                Accept Request
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default AgencyRequest;