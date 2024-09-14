import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ children }) => {
  return isAuthenticated()?.admin ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default AdminRoute;
