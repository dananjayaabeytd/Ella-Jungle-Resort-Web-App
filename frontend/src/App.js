import React from "react";
import AgencyDetails from "./pages/travelAgency/client/agencyDetails";
import AgencyList from "./pages/travelAgency/client/agencyList";
import AgencySendRequest from "./pages/travelAgency/client/agencySendRequest";
import AgencyRequestList from "./pages/travelAgency/agency/agencyRequestList";
import AgencyRequestDetails from "./pages/travelAgency/agency/agencyRequestDetails";
import AgencySentRequestList from "./pages/travelAgency/client/agencySentRequestList";
import AgencySentRequestDetails from "./pages/travelAgency/client/agencySentRequestDetails";
import AgencyCreatePackage from "./pages/travelAgency/agency/agencyCreatePackage";
import AgencyMyPackage from "./pages/travelAgency/agency/agencyMyPackage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/AgencySendRequest/:userId/:agencyId" element={<AgencySendRequest />} />
          <Route path="/AgencyList/:userId" element={<AgencyList />} />
          <Route path="/AgencyDetails/:userId/:agencyId" element={<AgencyDetails />} />
          <Route path="/AgencyRequestList/:agencyId" element={<AgencyRequestList />} />
          <Route path="/AgencyRequestDetails/:requestId" element={<AgencyRequestDetails />} />
          <Route path="/AgencySentRequestList/:userId" element={<AgencySentRequestList />} />
          <Route path="/AgencySentRequestDetails/:requestId" element={<AgencySentRequestDetails />} />
          <Route path="/AgencyCreatePackage/:agencyId" element={<AgencyCreatePackage />} />
          <Route path="/AgencyMyPackage/:agencyId" element={<AgencyMyPackage />} />
        </Routes>
      </div>
    </Router>
  );
}
