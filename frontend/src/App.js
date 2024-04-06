import './App.css';



import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

// VilanIN
import EventHeader from './components/EventHeader';
import AddEvent from "./components/AddEvent"
import EventList from "./components/EventList"
import UpdateEvent from "./components/UpdateEvent"
import AddOption from "./components/AddOption"
import OptionList from "./components/OptionList"
import ViewEvent from "./components/ViewEvent"
import EventHome from "./components/EventHome"
import UpdateOption from "./components/UpdateOption"
import PopupAd from "./components/PopupAd"

import TestPage from "./components/TestPage"
import TestSecondary from "./components/TestSecondary"
//VilanOUT

export default function App() {
  return (
    <Router>
     <EventHeader/>
      <div>
      
        <Routes>
          <Route path="/eventHome" exact element={<EventHome/>}/>
          <Route path="/events" exact element={<EventList/>}/>
          <Route path="/addEvent" exact element={<AddEvent/>}/>
          <Route path="/updateEvent/:eventId" exact element={<UpdateEvent/>}/>
          <Route path="/addOption" exact element={<AddOption/>}/>
          <Route path="/allOptions" exact element={<OptionList/>}/>
          <Route path="/viewEvent/:eventId" exact element={<ViewEvent/>}/>
          <Route path="/EventHeader" exact element={<EventHeader/>}/>
          <Route path="/test" exact element={<TestPage/>}/>
          <Route path="/updateOption/:optionId" exact element={<UpdateOption/>}/>
        </Routes>
        
      </div>
    </Router>
  )
}
