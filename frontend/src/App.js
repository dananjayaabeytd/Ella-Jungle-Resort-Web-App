import AgencyDetails from "./pages/travelAgent/agencyDetails";
import AgencyList from "./pages/travelAgent/agencyList";
import AgencySendRequest from "./pages/travelAgent/agencySendRequest";
import AgencyRequest from "./pages/travelAgent/agencyRequest";
import AgencyRequestList from "./pages/travelAgent/agencyRequestList";

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
          <Route path="/AgencyRequest" element={<AgencyRequest/>} />
        </Routes>
      </div>
    </Router>
  );
}
