import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./AuthApi"; // function that checks token

export default function GuestRoute() {
  // if user is logged in, redirect to home/dashboard
  return isAuthenticated() ? <Navigate to="/" replace /> : <Outlet />;
}
