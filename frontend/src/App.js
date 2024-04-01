import React from "react";
import AgencyDetails from "./pages/travelAgency/client/agencyDetails";
import AgencyList from "./pages/travelAgency/client/agencyList";
import AgencySendRequest from "./pages/travelAgency/client/agencySendRequest";
import AgencyRequestList from "./pages/travelAgency/agency/agencyRequestList";
import AgencyRequestDetails from "./pages/travelAgency/agency/agencyRequestDetails";
import AgencySentRequestList from "./pages/travelAgency/client/agencySentRequestList";
import AgencySentRequestDetails from "./pages/travelAgency/client/agencySentRequestDetails";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/AgencySendRequest/:agencyId/:clientId" element={<AgencySendRequest />} />
          <Route path="/AgencyList/:clientId" element={<AgencyList />} />
          <Route path="/AgencyDetails/:agencyId/:clientId" element={<AgencyDetails />} />
          <Route path="/AgencyRequestList" element={<AgencyRequestList />} />
          <Route path="/AgencyRequestDetails/:id" element={<AgencyRequestDetails />} />
          <Route path="/AgencySentRequestList" element={<AgencySentRequestList />} />
          <Route path="/AgencySentRequestDetails/:id" element={<AgencySentRequestDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
