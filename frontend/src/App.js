import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import EventHome from './EventHome';


export default function App() {
  return (
    <Router>
     <EventHeader/>
      <div>
      
        <Routes>
          <Route path="/eventHome" exact element={<EventHome/>}/>

        </Routes>
        
      </div>
    </Router>
  )
}
