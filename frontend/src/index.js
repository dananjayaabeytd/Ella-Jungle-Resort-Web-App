import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from '@material-tailwind/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/root.layout';
import SignInPage from './pages/login/sign-in.page';
import SignUpPage from './pages/signup/sign-up.page';
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
        element: <PrivateRoute component={MembersTable}/>,
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
