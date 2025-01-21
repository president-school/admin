import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const location = useLocation();

  // Redirect logic for unauthenticated users
  useEffect(() => {
    if (!user) {
      console.log("Redirecting to login...");
    }
  }, [user]);

  return user ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
