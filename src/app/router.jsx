import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/landing/Home";
import AuthPage from "../pages/AuthPage";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute from "../features/auth/GuestRoute";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      // Guest routes: login/register
      {
        element: <GuestRoute />,
        children: [{ path: "/login", element: <AuthPage /> }],
      },

      // protected routes
      {
        element: <ProtectedRoute />,
        children: [{ path: "/", element: <Home /> }],
      },
    ],
  },
]);
