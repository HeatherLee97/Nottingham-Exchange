import { createBrowserRouter } from 'react-router-dom';
// import Dashboard from '../components/Dashboard'; 
import StockDetails from '../components/StockDetailsPage/StockDetails';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import OrdersPage from '../components/OrdersPage/OrdersPage';
import StockList from '../components/StockDetailsPage/StockList';
import '../index.css'


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
        path: "stocks", 
        element: <StockList />,
      },
      {
        path: "stock/:stockSymbol", 
        element: <StockDetails />,
      },
      {
        path: "orders", 
        element: <OrdersPage />,
      },
    //   {
    //     path: "dashboard", 
    //     element: <Dashboard />,
    //   },
    ],
  },
]);

export default router;
