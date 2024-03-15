import { Outlet } from "react-router-dom";
import Navigation from "../components/shared/Navigation";
import Footer from "../components/shared/Footer";

function RootLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer/>
    </>
    
  );
}

export default RootLayout;
