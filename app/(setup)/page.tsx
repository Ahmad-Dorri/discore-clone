import SigninButton from "@/components/sign-in-button";
import { getServerSession } from "next-auth";

import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import LoginModal from "@/components/modals/login-modal";
const Home = async () => {
  const session = await getServerSession(options);
  const profile = session?.user;

  if (!profile) {
    return null;
  }

  const server = await prisma?.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    <div>
      <LoginModal />
      <SigninButton />
    </div>
  );
};

export default Home;
