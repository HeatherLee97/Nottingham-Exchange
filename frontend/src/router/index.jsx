import Dashboard from '../components/Dashboard'; // Import the Dashboard component

const router = createBrowserRouter([
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