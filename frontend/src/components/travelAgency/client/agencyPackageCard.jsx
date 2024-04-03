import React, { useState, useEffect } from "react";
import axios from "axios";

function AgencyPackageCard({
  key,
  packageName,
  packageImage,
  packageDescription,
  price,
  fullDays,
  activityId,
  roomId,
  transportId,
  userId
}) {

	const [activityName, setActivityName] = useState("");
  const [roomName, setRoomName] = useState("");

	useEffect(() => {
    // Fetch activity name by ID
    axios.get(`http://localhost:3005/getActivityById/${activityId}`)
      .then(response => {
        setActivityName(response.data.name);
      })
      .catch(error => {
        console.error("Error fetching activity:", error);
      });

    // Fetch room type by ID
    axios.get(`http://localhost:3005/rooms/${roomId}`)
      .then(response => {
        setRoomName(response.data.roomName);
      })
      .catch(error => {
        console.error("Error fetching room:", error);
      });
  }, [activityId, roomId]);

  const imageUrl = packageImage ? 
    `../../../assets/agencyPackageImages/${packageImage}` :
    `../../../assets/No_Image.png`;

    if(packageImage === null){
      packageImage = "No_Image.png";
    }
	
  return (
    <section className="w-full px-5 py-5 bg-white border border-black border-solid grow rounded-xl max-md:pl-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <figure className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src={require(`../../../assets/agencyPackageImages/${packageImage}`)}
            alt={packageName}
            className="grow w-full aspect-[0.86] max-md:mt-9"
          />
        </figure>
        <div className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto font-bold max-md:mt-10">
            <h2 className="text-3xl text-black text-opacity-80">
              {packageName}
            </h2>
            <ul className="text-xs text-black mt-11 text-opacity-60 max-md:mt-10">
              <li>{fullDays} days</li>
              <li>Activity Name: {activityName}</li>
              <li>Room Type: {roomName}</li>
              <li>transport id: {transportId}</li>
              <li>{packageDescription}</li>
            </ul>
            <p className="text-2xl text-green-600 mt-7">LKR {price}</p>
            
            <div className="justify-center mt-5 max-md:px-5">
              <button className=" w-[200px] h-10 bg-green-400 rounded-full text-white text-lg font-semibold relative overflow-hidden group hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                Book Now
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AgencyPackageCard;
