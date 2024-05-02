import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from '@material-tailwind/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/root.layout';
import SignInPage from './pages/login/sign-in.page';
import SignUpPage from './pages/sign-up.page';
import HomePage from './pages/home/home.page';
import ResetPwd from './pages/login/components/ResetPwd';
import MembersTable from './pages/useradmin/admin.allusers';
import Login from './pages/login/components/Login';
import Profile from './pages/profile/profile';
import AgencyRegister from './pages/agencyRegister/AgencyRegister';
import AgencyList from './pages/allagencies/AgencyList';
import AgencyProfile from './pages/allagencies/AgencyProfile';
import UpdateAgency from './pages/allagencies/components/UpdateAgency';
import Dashboard from './pages/useradmin/Dashboard';
import { UserUpdate } from './pages/useradmin/components/UpdateUser';
import PrivateRoute from './PrivateRoute';

//Ishara
import AddFeedback from './pages/feedback/components/AddFeedback';
import AllFeedback from './pages/feedback/components/AllFeedback';
import AllFaq from './pages/faq/components/AllFaq';
import AddFaq from './pages/faq/components/AddFaq';
import MyFeedback from './pages/feedback/components/MyFeedback';
import UpdateFeedback from './pages/feedback/components/UpdateFeedback';
import Faq from './pages/faq/components/Faq';
import UpdateFaq from './pages/faq/components/UpdateFaq';
import AddagencyFeedback from './pages/agencyfeedback/components/Addagencyfeedback';
import Uniqueuserfeedback from './pages/agencyfeedback/components/Uniqueuserfeedbacks';
import Uniqueagencyfeedback from './pages/agencyfeedback/components/Uniqueagencyfeedbacks';

//Dushan
import ResidenceHome from './pages/Residence-homepage/Residence-homepage';
import Residencebooking from './pages/Residence-booking-page/residencebooking';
import AddRooms from './pages/Room-management/AddRooms';
import RoomPage from './pages/Room-management/RoomPage';
import UpdateRoomForm from './pages/Room-management/UpdateRoom';
import AvailableRooms from './pages/Residence-booking-page/Residence-booking-components/AvailableRooms';
import ReservationForm from './pages/Residence-booking-page/Residence-booking-components/Bookingform';
import ReservationPage from './pages/Reservation-management/reservationPage';
import MyReservation from './pages/Residence-booking-page/Residence-booking-components/myReservation';

//Sayuni
import AddForm from './pages/AddActivity/AddForm';
import UpdateForm from './pages/UpdateActivity/UpdateForm';
import ViewActivity from './pages/AllActivity/ViewActivity';
import HomeActivity from './pages/HomeActivity/HomeActivity';
import ReservationActivity from './pages/ReservationActivity/ReservationActivity';
import ConfirmReservation from './pages/ConfirmReservation/ConfirmReservation';
import ViewActivityReservation from './pages/AllActivity/ViewActivityReservation';


//Sathma
import Spa from './pages/spaPackages/spa';
import SpaUser from './pages/spaPackages/spaUser';
import AppointmentView from './pages/spaPackages/appointmentView';
import SpaUserList from './pages/spaPackages/spaUserList';

import store from './store';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/sign-in',
        element: <SignInPage />,
        children: [
          {
            path: '/sign-in/',
            element: <Login />,
          },
          {
            path: '/sign-in/reset',
            element: <ResetPwd />,
          },
        ],
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/agencyregister',
        element: <AgencyRegister />,
      },
      {
        path: '/all',
        element: <PrivateRoute component={MembersTable} />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/agency',
        element: <AgencyList />,
      },
      {
        path: '/:id',
        element: <PrivateRoute component={AgencyProfile} />,
      },
      {
        path: 'update/:id',
        element: <UpdateAgency />,
      },
      {
        path: '/admindashboard',
        element: <Dashboard />,
      },
      {
        path: 'updateuser/:id',
        element: <UserUpdate />,
      },

      //Ishara
      {
        path: '/feedback',
        element: <AllFeedback />,
      },
      {
        path: '/addfeedback',
        element: <AddFeedback />,
      },
      {
        path: '/myfeedback',
        element: <MyFeedback />,
      },
      {
        path: '/faq',
        element: <AllFaq />,
      },
      {
        path: '/addfaq',
        element: <AddFaq />,
      },
      {
        path: '/myfaq',
        element: <Faq />,
      },
      {
        path: '/updatefeedback',
        element: <UpdateFeedback />,
      },
      {
        path: '/updatefaq',
        element: <UpdateFaq />,
      },
      {
        path: '/addagencyfeedback/:agencyId',
        element: <AddagencyFeedback />,
      },
      {
        path: '/myagencyfeedback',
        element: <Uniqueuserfeedback />,
      },
      {
        path: '/uniqueagency/:id',
        element: <Uniqueagencyfeedback />,
      },

      //Dushan
      {
        path: '/residenceHome',
        element: <ResidenceHome />,
      },
      {
        path: '/residenceBooking',
        element: <Residencebooking />,
      },
      {
        path: '/AddRoom',
        element: <AddRooms />,
      },
      {
        path: '/RoomPage',
        element: <RoomPage />,
      },
      {
        path: '/UpdateRoom/:id',
        element: <UpdateRoomForm />,
      },
      {
        path: '/Available',
        element: <AvailableRooms />,
      },
      {
        path: '/Booking/:id',
        element: <ReservationForm />,
      },
      {
        path: '/allReservations',
        element: <ReservationPage />,
      },
      {
        path: '/myReservations/:id',
        element: <MyReservation />,
      },





      //Sayuni
      {
        path: '/activity',
        element: <ViewActivity />,
      },
      {
        path: '/activity/add',
        element: <AddForm />,
      },
      {
        path: '/activity/update/:id',
        element: <UpdateForm />,
      },
      {
        path: '/activity/home',
        element: <HomeActivity />,
      },
      {
        path: '/activity/apply/:id',
        element: <ReservationActivity />,
      },
      {
        path: '/activity/confirmactivity/:id',
        element: <ConfirmReservation />,
      },
      {
        path: '/activity/allActivityReservation',
        element: <ViewActivityReservation />,
      },


      //Sathma
      {
        path: '/spa',
        element: <Spa />,
      },{
        path: '/spaUser',
        element: <SpaUser />,
      },
      {
        path: '/appointmentView',
        element: <AppointmentView />,
      },
      {
        path: '/spaUserList',
        element: <SpaUserList />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
