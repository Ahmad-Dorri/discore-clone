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
  console.log(session);
  if (!session) {
    redirect("/signIn");
  }
  // const verifiedUser = verifyJwt(session?.user.accessToken);
  // if (!verifiedUser) {
  //   signOut();
  //   redirect("/signIn");
  // }

  const server = await prisma.server.findFirst({
    where: {
      id: params.serverId,
    },
  });
  return <div>{server?.name}</div>;
};

export default ServerPage;
