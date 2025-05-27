import { createBrowserRouter } from 'react-router-dom';
import ProfilePage from '../components/ProfilePage/ProfilePage'; 
import StockDetails from '../components/StockDetailsPage/StockDetails';
import LoginFormPage from '../components/LoginForm';
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
      {
        path: "profilepage", 
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;