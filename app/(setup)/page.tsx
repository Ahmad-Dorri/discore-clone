import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import SigninButton from "@/components/sign-in-button";
import { options } from "../api/auth/[...nextauth]/options";
import ServerModal from "@/components/modals/server-modal";

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
      <ServerModal />
      <SigninButton />
    </div>
  );
};

export default Home;
