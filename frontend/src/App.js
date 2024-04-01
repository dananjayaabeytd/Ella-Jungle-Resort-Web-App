import Header from './components/Header';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import AddEvent from "./components/AddEvent"
import EventList from "./components/EventList"
import UpdateEvent from "./components/UpdateEvent"

import TestPage from "./components/TestPage"
import TestSecondary from "./components/TestSecondary"

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<EventList/>}/>
          <Route path="/add" exact element={<AddEvent/>}/>
          <Route path="/update/:eventId" exact element={<UpdateEvent/>}/>
        </Routes>
        
      </div>
    </Router>
  )
}
