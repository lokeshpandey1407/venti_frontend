import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("authToken") || localStorage.getItem("authUser")) {
      const token = localStorage.getItem("authToken");
      if (isTokenExpired(token)) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        setIsAuthenticated(false);
        navigate("/login");
      } else {
        setIsAuthenticated(true);
      }
    } else {
      navigate("/login");
    }
  }, []);
  if (isAuthenticated) {
    return children;
  } else {
    <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
