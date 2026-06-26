import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";

/**
 * AuthGuard shields protected routes and enforces post-login workflows.
 * 
 * Rules:
 * 1. requireAuth = true (Protected Pages: /profile, /app/chats, /setup-profile)
 *    - If unauthenticated: Always redirect to /login.
 *    - If authenticated and visiting /setup-profile: Redirect to /app/chats if profile is complete.
 *    - If authenticated and visiting other protected routes: Redirect to /setup-profile if profile is incomplete.
 * 
 * 2. requireAuth = false (Guest-only Pages: /login, /signup, /forgot-password)
 *    - If authenticated: Redirect to /app/chats (if profile exists) or /setup-profile (if profile missing).
 *    - If unauthenticated: Allow access.
 */
const AuthGuard = ({ children, requireAuth = true, isSetupProfile = false }) => {
  const { user, profile } = useAuth();

  if (requireAuth) {
    // If route is protected but user is not logged in, redirect to login page
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (isSetupProfile) {
      // User is logged in and visiting /setup-profile, but already has a profile -> send to chats dashboard
      if (profile) {
        return <Navigate to="/app/chats" replace />;
      }
    } else {
      // User is logged in, but has not completed their profile setup -> send to setup-profile page
      if (!profile) {
        return <Navigate to="/setup-profile" replace />;
      }
    }
  } else {
    // If route is public-only (guest page) but user is already logged in, redirect appropriately
    if (user) {
      if (profile) {
        return <Navigate to="/app/chats" replace />;
      } else {
        return <Navigate to="/setup-profile" replace />;
      }
    }
  }

  // Render children if all check conditions pass
  return children;
};

export default AuthGuard;
