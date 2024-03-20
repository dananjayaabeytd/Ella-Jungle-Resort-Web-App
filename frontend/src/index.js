import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/root.layout'
import LoginPage from './pages/login.page';
import SignUpPage from './pages/sign-up.page';
import HomePage from "./pages/home/home.page";
import ResidenceHome from './pages/Residence-homepage/Residence-homepage';
import Residencebooking from './pages/Residence-booking-page/residencebooking';
import AddRooms from './pages/Room-management/AddRooms';
import RoomPage from './pages/Room-management/RoomPage';
import UpdateRoomForm from './pages/Room-management/UpdateRoom';


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/residenceHome',
        element: <ResidenceHome/>
      },
      {
        path: '/residenceBooking',
        element: <Residencebooking/>
      },
      {
        path: '/AddRoom',
        element: <AddRooms/>
      },
      {
        path: '/RoomPage',
        element: <RoomPage/>
      },
      {
        path: '/UpdateRoom/:id',
        element: <UpdateRoomForm/>
      }
     
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
