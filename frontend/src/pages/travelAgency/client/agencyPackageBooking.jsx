import React, { useEffect, useState } from "react";
import { Input, initTWE } from "tw-elements";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

// Initialize the tw-elements library
initTWE({ Input });

function AgencyPackageBooking() {
  const { userId, packageId } = useParams();
  const navigate = useNavigate();
  const [packageDetails, setPackageDetails] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [agencyId, setAgencyId] = useState("");

  // Ensure that the tw-elements library is initialized only once
  useEffect(() => {
    return () => {
      initTWE({});
    };
  }, []);

  // * Fetching package details
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/getAgencyPackageById/${packageId}`);

        setPackageDetails(response.data);
        const agencyId = response.data.agencyId; // Extract the agencyId from the fetched package details
        setAgencyId(agencyId);
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  // * Fetching user details
  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3005/getUserDetails/${userId}`);
  //       const userData = response.data;
  //       setFullName(userData.fullName);
  //       setEmail(userData.email);
  //       setContactNumber(userData.contactNumber);
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //     }
  //   };

  //   fetchUserDetails();
  // }, [userId]);

  // * Handle booking
  const handleBookNow = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3005/addAgencyPackageReservation", {
        packageId: packageId,
        userId: userId,
        fullName: fullName,
        email: email,
        contactNumber: contactNumber,
        reservationDate: new Date(),
        checkIn: checkInDate,
        checkOut: checkOutDate,
        noOfAdults: adults,
        noOfChildren: children,
        totalAmount: packageDetails.price,
        paymentStatus: false,
      });
      console.log(response.data);

      // Check if the response is successful
      if (response.status === 200) {
        // Update room reservation
        await axios.post("http://localhost:3005/booking", {
          roomID: packageDetails.roomID,
          fullName: fullName,
          email: email,
          contactNumber: contactNumber,
          checkIn: checkInDate,
          checkOut: checkOutDate,
        });

        Swal.fire({
          icon: "success",
          title: "Your reservation has been added successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Navigate to the AgencyDetails page
          navigate(`/AgencyDetails/${userId}/${agencyId}`);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error adding reservation:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div>
      <div className='flex mx-auto my-10'>
        <h1 className='flex mx-auto text-4xl'>Enter Your Details</h1>
      </div>

      <div className='flex justify-center w-[600px] rounded-xl mx-auto border border-green-500 min-h-10 bg-gray-400 bg-opacity-10'>
        <form className='w-[400px]'>
          {packageDetails && (
            <>
              <h1 className='text-2xl text-black mt-7'>
                Package Name: {packageDetails.packageName}
              </h1>
              <div className='my-5 '>
                <label className='block text-xl font-medium text-gray-700'>Full Name</label>
                <input
                  type='text'
                  className='border border-green-500  min-h-[auto] w-[400px] rounded-xl border-1  px-3 py-[0.32rem]'
                  placeholder='Enter Name'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className='my-3 '>
                <label className='block text-xl font-medium text-gray-700 '>Email</label>
                <input
                  type='email'
                  className='border border-green-500 w-[400px] min-h-[auto]  rounded-xl border-1  px-3 py-[0.32rem]'
                  placeholder='Enter Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='my-3 '>
                <label className='block text-xl font-medium text-gray-700'>Contact Number</label>
                <input
                  type='text'
                  className='border border-green-500  min-h-[auto] w-[400px] rounded-xl border-1  px-3 py-[0.32rem]'
                  placeholder='Enter Date'
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>

              <div className='flex '>
                <div className='my-3 '>
                  <label className='block text-xl font-medium text-gray-700'>Check In</label>
                  <input
                    type='date'
                    className='border border-green-500  min-h-[auto] w-[180px] rounded-xl border-1  px-3 py-[0.32rem]'
                    placeholder='Enter Date'
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className='my-3 ml-10'>
                  <label className='block text-xl font-medium text-gray-700'>Check Out</label>
                  <input
                    type='date'
                    className='border border-green-500  min-h-[auto] w-[180px] rounded-xl border-1  px-3 py-[0.32rem]'
                    placeholder='Enter Date'
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate}
                  />
                </div>
              </div>

              <div className='flex flex-col'>
                <div className='flex items-center my-3'>
                  <label className='block mr-3 text-xl font-medium text-gray-700'>Adults</label>
                  <input
                    type='number'
                    className='border ml-5 border-green-500 min-h-[auto] w-[100px] rounded-xl border-1 px-3 py-[0.32rem]'
                    placeholder='Number of Adults'
                    onChange={(e) => setAdults(e.target.value)}
                    min={1}
                    required
                  />
                </div>
                <div className='flex items-center my-3'>
                  <label className='block mr-3 text-xl font-medium text-gray-700'>Children</label>
                  <input
                    type='number'
                    className='border border-green-500 min-h-[auto] w-[100px] rounded-xl border-1 px-3 py-[0.32rem]'
                    placeholder='Number of Children'
                    onChange={(e) => setChildren(e.target.value)}
                    min={0}
                  />
                </div>
              </div>

              <div className='flex items-center justify-between my-7'>
                <p className='text-2xl text-green-600'>LKR {packageDetails.price}.00</p>
                <button
                  className='w-[200px] h-10 bg-green-400 border border-gray-400 rounded-full text-white text-lg font-semibold relative overflow-hidden group hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300'
                  onClick={handleBookNow}
                >
                  Book Now
                  <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease'></span>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default AgencyPackageBooking;
