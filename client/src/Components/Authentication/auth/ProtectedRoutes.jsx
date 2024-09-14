import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./index.js";

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? (
    children
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default ProtectedRoute;
