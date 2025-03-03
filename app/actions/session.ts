"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

// This interface defines the shape of data we'll return from our server functions
// It helps TypeScript understand our data structure and provides better autocomplete
export interface ServerSessionData {
  // Whether the user is currently logged in
  isAuthenticated: boolean;
  // User information - null if not logged in
  user: {
    email?: string | null; // The user's email address
    roles?: string[]; // Array of roles assigned to the user
  } | null;
}

/**
 * Gets the current user's session data from the server
 * This is a server-side function, so it never runs in the browser
 *
 * @returns {Promise<ServerSessionData>} Object containing authentication status and user data
 */
export async function getServerSessionData(): Promise<ServerSessionData> {
  // Get the session from NextAuth
  const session = await getServerSession(authOptions);

  // Return a formatted version of the session data
  return {
    // !!session converts session to a boolean - true if exists, false if null/undefined
    isAuthenticated: !!session,
    // If we have a user, return their data, otherwise return null
    user: session?.user
      ? {
          email: session.user.email,
          roles: session.user.roles || [], // Default to empty array if no roles
        }
      : null,
  };
}

/**
 * Checks if the current user has a specific role
 * Useful for role-based access control
 *
 * @param {string} role - The role to check for
 * @returns {Promise<boolean>} True if the user has the role, false otherwise
 */
export async function checkUserHasRole(role: string): Promise<boolean> {
  const session = await getServerSession(authOptions);
  // Optional chaining (?.) helps avoid errors if any part of the path is undefined
  return session?.user?.roles?.includes(role) || false;
}
