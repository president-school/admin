import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { Sidebar } from "lucide-react";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  return user ? (
    <>
      <Sidebar />
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
