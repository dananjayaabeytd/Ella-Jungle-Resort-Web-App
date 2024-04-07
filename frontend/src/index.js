import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/root.layout'
import LoginPage from './pages/login.page';
import SignUpPage from './pages/sign-up.page';
import HomePage from "./pages/home/home.page";
import PackagesHomePage from './pages/hotel packages/packages home/home.page';
import PackagesPage from './pages/hotel packages/all packages/hotel.packages';
import PackageAdd from './pages/hotel packages/add packages/add.package.page';
import PackageTable from './pages/hotel packages/packages_display_admin/packages.table.page';
import Custompackage from './pages/hotel packages/custom packages/Custompackage';
import DisplayCutomPackages from './pages/hotel packages/custom packages/Show';
import HotelBookingForm from './pages/hotel packages/booking packages/hotel_booking/hotel.booking';
import CustomBookingForm from './pages/hotel packages/booking packages/custom_booking/custom.booking';
import CustomBookingDisplay from './pages/hotel packages/booking packages/custom_booking/CustomBookingDisplay';
import HotelBookingDisplay from './pages/hotel packages/booking packages/hotel_booking/HotelBookingDisplay';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/hotel/:id/:price',
        element: <HotelBookingForm />,
      },
      {
        path: '/hotelbookingdisplay',
        element: <HotelBookingDisplay />,
      },

      {
        path: '/cus/:id/:price',
        element: <CustomBookingForm />,
      },
      {
        path: '/cusbokingdisplay',
        element: <CustomBookingDisplay />,
      },

      {
        path: '/',
        element: <PackagesHomePage/>,
      },
      {
        path: '/customcreated',
        element: <DisplayCutomPackages />,
      },

      {
        path: '/custom_1',
        element: <Custompackage />,
      },

      {
        path: '/packages',
        element: <PackagesPage />,
      },
     
      {
        path: '/add',
        element: <PackageAdd />,
      },
      {
        path: '/table',
        element: <PackageTable />,
      },
      {
        path: '/update',
        element: <updatePack />,
      },

    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
