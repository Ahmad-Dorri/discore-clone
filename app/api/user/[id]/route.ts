import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";

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
  const userPosts = await prisma.post.findMany({
    where: {
      authorId: +params.id,
    },
    include: {
      author: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });

  return new Response(JSON.stringify(userPosts));
}
