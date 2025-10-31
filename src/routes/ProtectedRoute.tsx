import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";



const ProtectedRoute: React.FC = () => {
  const accessToken = Cookies.get("access");


  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;

  if (!accessToken || !user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
