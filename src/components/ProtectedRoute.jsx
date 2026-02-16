/* import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../features/auth/AuthApi";
export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("access-token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
}
 */


import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../features/auth/AuthApi";

export default function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
