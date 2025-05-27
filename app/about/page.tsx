//in react Server Components we use getServerSession to get the session
import { getServerSession } from "next-auth";

export default async function About() {
  //get the session
  //this can be used in any server component
  const session = await getServerSession();
  if (!session) {
    return <div>Please sign in to view this page</div>;
  }
  const user = session?.user;
  return (
    <div>
      <h2 className="text-3xl">This is the About Page</h2>
      <h3>User: {user?.name}</h3>
      <p>Email: {user?.email}</p>
      <img src={user?.image ?? ""} alt="User Avatar" />
    </div>
  );
}
