import { redirect } from "next/navigation";

import ServerSidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";

interface ServerIdProps {
  children: React.ReactNode;
  params: {
    serverId: string;
  };
}

const ServerIdLayout = async ({ children, params }: ServerIdProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/signIn");
  }
  const server = await prisma?.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-20 hidden h-full w-60 flex-col md:flex ">
        <ServerSidebar />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
