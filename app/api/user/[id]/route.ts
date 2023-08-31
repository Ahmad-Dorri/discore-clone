import { db } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";

interface Params {
  params: {
    id: number;
  };
}
export async function GET(request: Request, { params }: Params) {
  const accessToken = request.headers.get("Authorization");
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(
      JSON.stringify({
        error: "unAuthorized",
      }),
      { status: 401 },
    );
  }
  // const userServers = await prisma.profile.findMany({
  //   where: {

  //   },
  //   include: {
  //     author: {
  //       select: {
  //         email: true,
  //         name: true,
  //       },
  //     },
  //   },
  // });
  const userServers = await prisma.user.findMany({
    where: {},
    include: {},
  });
  // return new Response(JSON.stringify());
}
