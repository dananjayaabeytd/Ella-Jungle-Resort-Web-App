import React from "react";
import AgencyDetailsProfile from "../../components/travelAgent/agencyDetailsProfile";


function AgencySendRequest() {
    return(
        <div>
            <AgencyDetailsProfile/>

            <div className="flex border border-black">
                <div className="flex border border-black m-w-[100px] min-h-[50px] mx-auto bg-green-500 bg-opacity-30">
                    <h3>Request new reservation</h3>
                </div>

            </div>
        </div>
    );
}

export default AgencySendRequest;