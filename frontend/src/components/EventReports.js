import React from "react";
import TicketTable from "./TicketTable";
import EventHeader from "./EventHeader";
import AllEvents from "./AllEvents";
import { useSelector } from "react-redux"; // Import useSelector

export default function EventReports() {
  const user = useSelector((state) => state.auth.userInfo); // userInfo may be null or contain `isAdmin

  return (
    <div>
      <EventHeader />
      <div>{user.isAdmin && <AllEvents />}</div>

      <TicketTable />
    </div>
  );
}
