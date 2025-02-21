//this is a protected API route
//it will only be accessible if the user is signed in
//we can use the session to check if the user is signed in
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  return new Response("Protected route", { status: 200 });
}
