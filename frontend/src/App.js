
import AddForm from "./pages/AddActivity/AddForm";
import MyNavbar from "./components/shared/Navigation";
import Footer from "./components/shared/Footer";
import UpdateForm from "./pages/UpdateActivity/UpdateForm";
import ViewActivity from "./pages/AllActivity/ViewActivity";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import HomeActivity from "./pages/HomeActivity/HomeActivity";


export default function App() {
  return (
      <Router>
        <div>
          <MyNavbar/>
              <Routes>
              <Route path="/add" element={<AddForm/>}/>
              <Route path="/update/:id" element={<UpdateForm/>}/>
              <Route path="/" element={<ViewActivity/>}/>
              <Route path="/home" element ={<HomeActivity/>}/>
              
              </Routes>
             
                
          <Footer/>

        </div>


      </Router>
      
  )
}
