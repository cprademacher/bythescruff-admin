import Layout from "@/components/Layout"
import {useSession} from "next-auth/react";
// import Image from "next/image"

export default function Home() {
  const {data: session} = useSession();

  return <Layout>
    <div className="text-blue-900">
      Hello, {session?.user?.name} 
      <img src={session?.user?.image} alt="User profile photo" />
    </div>
  </Layout>
}

// Check image by console.log(session.user.image) and making sure I have one before continuing.