import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { options } from "../api/auth/[...nextauth]/options";
import InitialModal from "@/components/modals/initial-modal";
import { prisma } from "@/lib/prisma";

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
      <InitialModal isOpen={true} />
    </div>
  );
};

export default Home;
