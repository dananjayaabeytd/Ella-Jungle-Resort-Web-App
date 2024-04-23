import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AgencyDetailsProfile from "../../../components/travelAgency/client/agencyDetailsProfile";

function AgencySendRequest() {
  const { userId, agencyId } = useParams();
  console.log("User ID:", userId);

  const [formData, setFormData] = useState({
    ArrivalDate: "",
    DepartureDate: "",
    NoOfDays: "",
    NoOfNights: "",
    NoOfAdults: "",
    NoOfChildren: "",
    RoomType: "",
    RequestDescription: "",
    UserId: userId,
    AgencyId: agencyId,
    Status: "false",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const currentDate = new Date().toISOString(); // Get the current date

    const updatedFormData = {
      ...formData,
      SentDate: currentDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:3005/AgencyNewRequest",
        updatedFormData
      );
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload(); 
      });

      console.log("Success:", response.data);

      // Clear the form after successful submission (optional)
      setFormData({
        ArrivalDate: "",
        DepartureDate: "",
        NoOfDays: "",
        NoOfNights: "",
        NoOfAdults: "",
        NoOfChildren: "",
        RoomType: "",
        RequestDescription: "",
        userId: userId,
        AgencyId: agencyId,
        Status: "",
      });
    } catch (error) {
      console.error("Error:", error); 
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      }).then(() => {
        window.location.reload(); 
      });
    }
  };

  return (
    <div>
      <div className="flex bg-gray-200 rounded-b-2xl bg-opacity-60">
        <AgencyDetailsProfile agencyId={agencyId} />
      </div>

      <div className="container my-10 flex flex-col mx-auto bg-gray-400 border border-green-600 bg-opacity-20 max-w-[1000px] rounded-xl">
        <div className="mt-3 text-2xl text-center">
          <h1>Request new reservation</h1>
        </div>

        <div className="flex mx-auto mt-10">
          <form onSubmit={handleSubmit}>
            <div className="flex items-start text-xl font-medium text-gray-900 form-group">
              <div className="flex flex-col gap-2 mx-20">
                <div className="flex items-start mb-2 ">
                  <label>Arrival Date</label>
                  <input
                    type="date"
                    id="arrivalDate"
                    name="ArrivalDate"
                    value={formData.ArrivalDate}
                    className="ml-[92px] rounded-lg border border-green-500 text-gray-700"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-start mb-2">
                  <label>Departure Date</label>
                  <input
                    type="date"
                    className="ml-[60px] rounded-lg border border-green-500 "
                    id="departureDate"
                    name="DepartureDate"
                    value={formData.DepartureDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-start mb-2">
                  <label>Number of Days</label>
                  <input
                    type="number"
                    className="ml-[52px] w-20 rounded-lg border border-green-500"
                    id="noOfDays"
                    name="NoOfDays"
                    value={formData.NoOfDays}
                    onChange={handleChange}
                    min="0" // Add min attribute to disallow negative numbers
                  />
                </div>
                <div className="flex items-start mb-2">
                  <label>Number of Nights</label>
                  <input
                    type="number"
                    className="ml-[41px] w-20 rounded-lg border border-green-500"
                    id="noOfNights"
                    name="NoOfNights"
                    value={formData.NoOfNights}
                    onChange={handleChange}
                    min="0" // Add min attribute to disallow negative numbers
                  />
                </div>
                <div className="flex items-start mb-2">
                  <label>Number of Adults</label>
                  <input
                    type="number"
                    className="ml-[44px] w-20 rounded-lg border border-green-500"
                    id="noOfAdults"
                    name="NoOfAdults"
                    value={formData.NoOfAdults}
                    onChange={handleChange}
                    min="0" // Add min attribute to disallow negative numbers
                  />
                </div>
                <div className="flex items-start mb-2">
                  <label>Number of Children</label>
                  <input
                    type="number"
                    className="w-20 ml-[24px] rounded-lg border border-green-500"
                    id="noOfChildren"
                    name="NoOfChildren"
                    value={formData.NoOfChildren}
                    onChange={handleChange}
                    min="0" // Add min attribute to disallow negative numbers
                  />
                </div>
              </div>

              <div className="flex flex-col mx-20 mt-[-5px] ">
                <div className="flex mb-2">Room Type</div>
                <div className="relative inline-flex hs-dropdown">
                  <select
                    className="inline-flex items-center px-4 py-3 text-sm font-medium text-gray-800 bg-white border border-green-500 rounded-lg shadow-sm hs-dropdown-toggle gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
                    aria-labelledby="hs-dropdown-default"
                    onChange={handleChange}
                    name="RoomType"
                  >
                    <option value="" disabled selected>
                      Select Room Type
                    </option>
                    <option value="chalet">Eco Jungle Chalet</option>
                    <option value="cottage">Eco Jungle Cottage</option>
                    <option value="cabin">Eco Jungle Cabin</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col mx-20 mt-3">
              <div className="mb-2 text-xl font-medium text-gray-900">
                <label className="">Special Requests:</label>
              </div>
              <div>
                <textarea
                  className="w-[750px] max-h-[100px] h-[100px] border-green-500 border rounded-lg"
                  name="RequestDescription"
                  value={formData.RequestDescription}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <button
                id="spRequest"
                className="mx-20 mt-4 mb-8 w-[200px] h-10 bg-green-500 rounded-full text-white text-lg font-semibold relative overflow-hidden group hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
                type="submit"
              >
                Send Request
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 rotate-12 group-hover:-translate-x-40 ease"></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AgencySendRequest;