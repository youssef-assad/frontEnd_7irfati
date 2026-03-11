

import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../features/auth/AuthApi";

export default function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
