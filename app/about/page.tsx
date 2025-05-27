"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const { data: session, status } = useSession();
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
    console.log("Current roles:", session?.user?.roles);

    if (session?.user?.roles && session.user.roles.length > 0) {
      console.log("Setting isLoadingRoles to false");
      setIsLoadingRoles(false);
    }
  }, [session, status]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">About Page</h1>

      <div className="mt-4">
        <h2 className="text-xl mb-2">Your Account</h2>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session?.user ? (
          <>
            <p>Email: {session.user.email}</p>
            <p>
              Roles:{" "}
              {isLoadingRoles ? (
                <span>Loading roles...</span>
              ) : (
                session.user.roles.join(", ") || "No roles assigned"
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
