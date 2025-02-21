"use client";
//bring in the session provider
//this is build around useContext
//Because it uses context it must be a client component
//this is how we will access the session in client components
import { SessionProvider } from "next-auth/react";

export default SessionProvider;
