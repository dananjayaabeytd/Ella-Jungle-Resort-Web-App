import React from 'react'
import TicketTable from './TicketTable';
import EventHeader from './EventHeader';
import AllEvents from './AllEvents';


export default function EventReports() {
  return (
    <div>
        <EventHeader/>
        <AllEvents/>
        <TicketTable/>
    </div>
  )
}


