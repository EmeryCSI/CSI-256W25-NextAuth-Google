//bring in next auth
import NextAuth from "next-auth";
//bring in google provider
import GoogleProvider from "next-auth/providers/google";

//we need an authOptions object
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
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
