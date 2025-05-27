"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function UsersPage() {
  const { data: session, status } = useSession();
  console.log(session);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to view this page</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <div className="space-y-4"></div>
    </div>
  );
}
