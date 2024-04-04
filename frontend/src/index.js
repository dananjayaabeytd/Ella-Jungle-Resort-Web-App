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
import AddFeedback from './pages/feedback/components/AddFeedback';
import AllFeedback from './pages/feedback/components/AllFeedback';
import AllFaq from './pages/faq/components/AllFaq';
import AddFaq from './pages/faq/components/AddFaq';
import MyFeedback from './pages/feedback/components/MyFeedback';
import UpdateFeedback from './pages/feedback/components/UpdateFeedback';
import Faq from './pages/faq/components/Faq';
import UpdateFaq from './pages/faq/components/UpdateFaq';

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
        element: <MembersTable />,
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
        element: <AgencyProfile />,
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
        element: <Faq />
      },
      {
        path: '/updatefeedback',
        element: <UpdateFeedback />
      },
      {
        path: '/updatefaq',
        element: <UpdateFaq />
      }

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
