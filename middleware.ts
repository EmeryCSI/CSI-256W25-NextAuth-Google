// Import the withAuth middleware from next-auth
// This is a helper function that handles authentication in Next.js applications
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Export the middleware configuration
// This middleware will run on specified routes to check if users are authenticated
export default withAuth(
  // Add a function to handle role-based authorization
  function middleware(req) {
    const token = req.nextauth.token as { roles?: string[] };

    // Check for admin-only routes
    if (req.nextUrl.pathname.startsWith("/admin")) {
      // Check if user has ADMIN role
      const hasAdminRole = token?.roles?.includes("ADMIN");
      if (!hasAdminRole) {
        // Redirect non-admin users to the home page
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Allow the request to proceed
    return NextResponse.next();
  },
  {
    // Configure custom pages for authentication
    pages: {
      // Specify the custom sign-in page route
      // When an unauthenticated user tries to access a protected route,
      // they will be redirected to /auth/signin
      signIn: "/auth/signin",
    },
  }
);

// Export the middleware matcher configuration
export const config = {
  // Define which routes should be protected by this middleware
  // The matcher uses a pattern matching syntax:
  // - "/protected/:path*" protects all routes starting with /protected/
  // - "/admin/:path*" protects all admin routes
  // - "/api/protected/:path*" protects all API routes starting with /api/protected/
  matcher: ["/protected/:path*", "/admin/:path*", "/api/protected/:path*"],
};
