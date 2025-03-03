"use client";

import { useUserSession } from "../hooks/useUserSession";

export default function AboutPage() {
  const { isLoading, isLoadingRoles, session, roles } = useUserSession();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">About Page</h1>

      <div className="mt-4">
        <h2 className="text-xl mb-2">Your Account</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : session?.user ? (
          <>
            <p>Email: {session.user.email}</p>
            <p>
              Roles:{" "}
              {isLoadingRoles ? (
                <span>Loading roles...</span>
              ) : (
                roles.join(", ") || "No roles assigned"
              )}
            </p>
          </>
        ) : (
          <p>Please sign in to see your roles</p>
        )}
      </div>
    </div>
  );
}
