import AgencyDetails from './pages/travelAgent/agencyDetails';
import AgencyList from './pages/travelAgent/agencyList';
import AgencySendRequest from './pages/travelAgent/agencySendRequest';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';



export default function App() {
  return (
    <Router>
      <div>
          {/* <AgencyDetails />  */}
        {/* <AgencyList />   */}
        {/* <AgencySendRequest/> */}
        
        <Routes>
          <Route path="/AgencySendRequest" element={<AgencySendRequest/>} />
        </Routes>
          
     
        
        {/* <AgencySendRequest /> */}
      </div>
    </Router>
  )
}
