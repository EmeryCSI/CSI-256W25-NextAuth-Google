import { redirect } from "next/navigation";
import { getServerSessionData } from "../actions/session";

/**
 * Contact Page Component
 *
 * This is a Server Component (notice there's no 'use client' directive)
 * Server Components are rendered on the server, which means:
 * - They can directly access databases and server resources
 * - They reduce the amount of JavaScript sent to the browser
 * - They can't use hooks or browser-only features
 *
 * The 'async' keyword allows us to use 'await' inside the component
 * to wait for server data before rendering
 */
export default async function Contact() {
  // Get the user's session data from our server action
  // This runs on the server, not in the browser
  const { isAuthenticated, user } = await getServerSessionData();

  // If the user isn't logged in, redirect them to the sign-in page
  // This is a security measure to protect private content
  if (!isAuthenticated) {
    redirect("/api/auth/signin");
  }

  // If we get here, the user is authenticated and we can render the page
  return (
    <div className="p-4">
      {/* Main heading with Tailwind classes for styling */}
      <h2 className="text-2xl font-bold mb-4">Contact</h2>

      {/* Container for user information */}
      <div className="space-y-2">
        {/* Display user's email */}
        <p className="text-lg">Email: {user?.email}</p>

        {/* Display user's roles or a message if they have none */}
        <p className="text-lg">
          Roles:{" "}
          {
            user?.roles?.length
              ? user.roles.join(", ") // If they have roles, join them with commas
              : "No roles assigned" // If no roles, show this message
          }
        </p>
      </div>
    </div>
  );
}
