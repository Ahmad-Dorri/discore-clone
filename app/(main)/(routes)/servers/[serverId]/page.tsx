import { prisma } from "@/lib/prisma";
interface ServerProps {
  params: {
    serverId: string;
  };
}
const ServerPage = async ({ params }: ServerProps) => {
  const server = await prisma.server.findFirst({
    where: {
      id: params.serverId,
    },
  });
  return <div>{server?.name}</div>;
};

export default ServerPage;
