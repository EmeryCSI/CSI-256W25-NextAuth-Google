import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

/**
 * Interface defining the shape of data returned by our custom hook
 * This helps TypeScript understand our data structure and provides better autocomplete
 */
interface UserSessionState {
  isLoading: boolean; // Whether we're still checking the session status
  isLoadingRoles: boolean; // Whether we're still loading the user's roles
  session: any; // The raw session data from NextAuth
  status: string; // The current status of the session ("loading", "authenticated", or "unauthenticated")
  roles: string[]; // Array of the user's roles
}

/**
 * Custom Hook: useUserSession
 *
 * This hook manages user session state on the client side.
 * It wraps NextAuth's useSession hook and adds additional functionality
 * for handling roles and loading states.
 *
 * Key Features:
 * - Manages session state
 * - Handles role loading
 * - Provides loading states for better UX
 * - Automatically updates session if roles are missing
 *
 * @returns {UserSessionState} Object containing session data and loading states
 */
export function useUserSession(): UserSessionState {
  // Use NextAuth's useSession hook to get the base session data
  // data: The session data
  // status: The current status of the session
  // update: Function to update the session (used to refresh session data)
  const { data: session, status, update } = useSession();

  // Track whether we're still loading the roles
  // This helps us show loading states in the UI
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);

  /**
   * Effect to handle role loading and session updates
   * This runs whenever the session or status changes
   *
   * If roles are missing but the user is authenticated:
   * 1. Keep isLoadingRoles true
   * 2. Update the session to fetch fresh data
   *
   * If roles are present:
   * 1. Set isLoadingRoles to false
   *
   * If no session or unauthenticated:
   * 1. Set isLoadingRoles to false
   */
  useEffect(() => {
    // Only proceed if we're authenticated
    if (status === "authenticated") {
      // Check if we have roles
      if (session?.user?.roles && session.user.roles.length > 0) {
        // We have roles, stop loading
        setIsLoadingRoles(false);
      } else {
        // No roles found but we're authenticated
        // Keep loading state true and trigger a session update
        setIsLoadingRoles(true);
        update(); // This will trigger a new session fetch
      }
    } else {
      // Not authenticated or still initial loading
      setIsLoadingRoles(false);
    }
  }, [session, status, update]); // Dependencies: re-run if session, status, or update changes

  // Return all the session-related data and states
  return {
    isLoading: status === "loading", // True while NextAuth is checking the session
    isLoadingRoles, // True while we're loading roles
    session, // The raw session data
    status, // The current session status
    roles: session?.user?.roles || [], // The user's roles (or empty array if none)
  };
}
