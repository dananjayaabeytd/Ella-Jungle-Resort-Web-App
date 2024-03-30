import AgencyDetails from "./pages/travelAgency/client/agencyDetails";
import AgencyList from "./pages/travelAgency/client/agencyList";
import AgencySendRequest from "./pages/travelAgency/client/agencySendRequest";
import AgencyRequest from "./pages/travelAgency/agencyRequest";
import AgencyRequestList from "./pages/travelAgency/agency/agencyRequestList";
import AgencyRequestDetails from "./pages/travelAgency/agency/agencyRequestDetails";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/AgencySendRequest" element={<AgencySendRequest />} />
          <Route path="/AgencyList" element={<AgencyList />} />
          <Route path="/AgencyDetails" element={<AgencyDetails />} />
          <Route path="/AgencyRequestList" element={<AgencyRequestList />} />
          <Route path="/AgencyRequest" element={<AgencyRequest />} />
          <Route
            path="/AgencyRequestDetails/:id"
            element={<AgencyRequestDetails />}
          />
        </Routes>
      </div>
    </Router>
  );
}
