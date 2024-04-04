import Header from './components/Header';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

import AddEvent from "./components/AddEvent"
import EventList from "./components/EventList"
import UpdateEvent from "./components/UpdateEvent"
import AddOption from "./components/AddOption"
import OptionList from "./components/OptionList"
import ViewEvent from "./components/ViewEvent"
import EventHome from "./components/EventHome"
import UpdateOption from "./components/UpdateOption"


import TestPage from "./components/TestPage"
import TestSecondary from "./components/TestSecondary"

export default function App() {
  return (
    
    <Router>
     <Header/>
      <div>
      
        <Routes>
          <Route path="/" exact element={<EventHome/>}/>
          <Route path="/events" exact element={<EventList/>}/>
          <Route path="/addEvent" exact element={<AddEvent/>}/>
          <Route path="/updateEvent/:eventId" exact element={<UpdateEvent/>}/>
          <Route path="/addOption" exact element={<AddOption/>}/>
          <Route path="/allOptions" exact element={<OptionList/>}/>
          <Route path="/viewEvent/:eventId" exact element={<ViewEvent/>}/>
          <Route path="/header" exact element={<Header/>}/>
          <Route path="/test" exact element={<TestPage/>}/>
          <Route path="/updateOption/:optionId" exact element={<UpdateOption/>}/>
        </Routes>
        
      </div>
    </Router>
  )
}
