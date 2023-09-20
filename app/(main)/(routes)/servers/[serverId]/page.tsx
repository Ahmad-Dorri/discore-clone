import { options } from "@/app/api/auth/[...nextauth]/options";
import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
interface ServerProps {
  params: {
    serverId: string;
  };
}
const ServerPage = async ({ params }: ServerProps) => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/signIn");
  }

  const verifiedUser = verifyJwt(session?.user.accessToken);

  if (!verifiedUser) {
    signOut();
    redirect("/signIn");
  }

  const channel = await prisma.channel.findFirst({
    where: {
      serverId: params.serverId,
    },
  });

  return redirect(`/servers/${params.serverId}/channels/${channel?.id}`);
};

export default ServerPage;
