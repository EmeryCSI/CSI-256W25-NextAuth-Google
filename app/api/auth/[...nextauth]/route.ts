//bring in next auth
import NextAuth from "next-auth";
//bring in google provider
import GoogleProvider from "next-auth/providers/google";
//bring in the database connection
import dbConnect from "@/app/utils/dbconnect";
//bring in the user model
import User, { DEFAULT_ROLE } from "@/app/models/User";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import { User as NextAuthUser } from "next-auth";

// Add types to include roles in the session and JWT
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      roles: string[];
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles?: string[];
  }
}

//we need an authOptions object
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    // This callback is called when creating a JWT on sign in
    async jwt({ token, user }: { token: JWT; user: any }) {
      // If we have a user signing in, get or create their DB entry to get roles
      if (user?.email) {
        await dbConnect();
        let dbUser = await User.findOne({ email: user.email });

        // Create new user if they don't exist
        if (!dbUser) {
          dbUser = await User.create({
            email: user.email,
            roles: [DEFAULT_ROLE],
          });
        }

        // Add roles to the token
        token.roles = dbUser.roles;
      }
      return token;
    },
    // This callback is called whenever a session is checked
    async session({ session, token }: { session: Session; token: JWT }) {
      // Add roles from token to session
      if (session?.user) {
        session.user.roles = token.roles || [];
      }
      console.log("Session working");
      return session;
    },
  },
  // Add explicit secret configuration
  secret: process.env.NEXTAUTH_SECRET,
};

//create a handler which uses nextAuth and the authOptions object
const handler = NextAuth(authOptions);

//export the handler
//this handler will response to any get and post request that come into this endpoint
export { handler as GET, handler as POST };

//navigate to http://localhost:3000/api/auth/providers to see the providers
//navigate to http://localhost:3000/api/auth/signin to see the signin page
//navigate to http://localhost:3000/api/auth/signout to see the signout page

//when a user signs in they a session is created
//this session is stored in a cookie and can be shared with each component in the app
