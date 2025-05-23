import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import StockDetails from '../components/StockDetailsPage/StockDetails';
import Layout from './Layout';
import Dashboard from '../pages/Dashboard';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "stocks",
        element: <StockDetails />,
      },
      {
        path: "dashboard", // Add the Dashboard route
        element: <Dashboard />,
      },
    ],
  },
]);
