import { createBrowserRouter } from "react-router-dom";

import AuthPage from "../pages/AuthPage";
import Home from "../pages/Home";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: < AuthPage/>,
  },{
    path:"/",
    element:<Home/>
  }
 
 // ARTISAN ROUTES
  /* {
    path: "/artisan",
    element: (
      <ProtectedRoute role="ARTISAN">
        <ArtisanLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "profile", element: <ArtisanProfile /> },
    ],} */
    ,
    
  // CLIENT ROUTES
  /* {
    path: "/client",
    element: (
      <ProtectedRoute role="CLIENT">
        <ClientLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "profile", element: <ClientProfile /> },
    ],
  }, */


]);
