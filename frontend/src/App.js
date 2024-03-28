import AddForm from "./pages/AddActivity/AddForm";
import MyNavbar from "./components/shared/Navigation";
import Footer from "./components/shared/Footer";
import ViewActivity from "./pages/AllActivity/ViewActivity";

export default function App() {
  return (

      <div>

        <MyNavbar/>
        <ViewActivity/>
        <Footer/>

      </div>
  )
}
