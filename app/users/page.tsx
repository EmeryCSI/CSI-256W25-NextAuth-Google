"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function UsersPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const isAdmin = session?.user?.roles?.includes("ADMIN");

  useEffect(() => {
    if (isAdmin) {
      // Only fetch users if admin
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error("Error fetching users:", err));
    }
  }, [isAdmin]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to view this page</div>;
  }

  if (!isAdmin) {
    return <div>Access denied. Admin only.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.email} className="p-2 border rounded">
            <p>Email: {user.email}</p>
            <p>Roles: {user.roles.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
