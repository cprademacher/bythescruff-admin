import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/nav";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    // What the user see's if not logged in
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  // What the user see's if they are logged in
  return (
    <div className="bg-blue-900 w-screen h-screen">
      <Nav />
      <div>
        <h1>Logged In {session.user.email}</h1>
        <button
          onClick={() => signOut()}
          className="bg-white p-2 px-4 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
