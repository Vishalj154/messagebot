import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";

/**
 * AuthGuard protects routes depending on authentication status.
 * 
 * - If requireAuth is true (Protected Routes e.g., Profile):
 *   Redirects to /login if user is not authenticated.
 * 
 * - If requireAuth is false (Auth-only Routes e.g., Login, Signup):
 *   Redirects to /profile if user is already authenticated.
 */
const AuthGuard = ({ children, requireAuth = true }) => {
  const { user } = useAuth();

  if (requireAuth) {
    // If route requires authentication and user is not logged in, redirect to login
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  } else {
    // If route is public-only (like login/signup) and user is logged in, redirect to profile
    if (user) {
      return <Navigate to="/profile" replace />;
    }
  }

  // Render children if all guards pass
  return children;
};

export default AuthGuard;
