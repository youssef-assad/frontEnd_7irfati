import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="page-container">
        <Outlet />
      </main>
    </>
  );
}
