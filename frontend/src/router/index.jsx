import { createBrowserRouter } from 'react-router-dom';
// import Dashboard from '../components/Dashboard'; 
import StockDetails from '../components/StockDetailsPage/StockDetails';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';


const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "stock/:stockSymbol", 
        element: <StockDetails />,
      },
    //   {
    //     path: "dashboard", 
    //     element: <Dashboard />,
    //   },
    ],
  },
]);

export default router;
