// import './App.css';

// export default function App() {
//   return (
//     <h1 className="text-3xl font-bold underline">
//       Hello world!
//     </h1>
//   )
// }

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/healthsafety/Home';
import Spa from './pages/healthsafety/spa';
import About from './pages/healthsafety/About';
import Packages from './pages/healthsafety/Packages';
import Appointment from './pages/healthsafety/Appointment';
import AppointmentView from './pages/healthsafety/AppointmentView';
import Fitness from './pages/healthsafety/fitness';




import './App.css'; // Assuming your CSS file is correctly placed

function App() {
  return (
    <Router>
      <div className="App">
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spa" element={<Spa />} />
          <Route path="/about" element={<About />} />
          <Route path="/Packages" element={<Packages />} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route path="/AppointmentView" element={<AppointmentView />} />
          <Route path="/Fitness" element={<Fitness />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
