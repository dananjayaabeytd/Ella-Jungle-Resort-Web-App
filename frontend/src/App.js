
import AddForm from "./pages/AddActivity/AddForm";
import MyNavbar from "./components/shared/Navigation";
import Footer from "./components/shared/Footer";
import UpdateForm from "./pages/UpdateActivity/UpdateForm";
import ViewActivity from "./pages/AllActivity/ViewActivity";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import HomeActivity from "./pages/HomeActivity/HomeActivity";
import ReservationActivity from "./pages/ReservationActivity/ReservationActivity";
import ConfirmReservation from "./pages/ConfirmReservation/ConfirmReservation";


export default function App() {
  return (
      <Router>
        <div>
          <MyNavbar/>
              <Routes>
              
              <Route path="/" element={<ViewActivity/>} />
              <Route path="/add" element={<AddForm />} />
              <Route path="/update/:id" element={<UpdateForm />} />
              <Route path="/home" element={<HomeActivity />} />
              <Route path="/apply/:id" element={<ReservationActivity />} />
              <Route path="/confirmactivity/:id" element={ConfirmReservation}/>
              </Routes>
             
                
          <Footer/>

        </div>


      </Router>
      
  )
}
