import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const accessToken = request.headers.get("authorization");

  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(
      JSON.stringify({
        error: "unauthorized",
      }),
      {
        status: 401,
      },
    );
  }
  const profile = await prisma.profile.findFirst({
    where: {
      id: params.id,
    },
  });

  return new Response(JSON.stringify(profile));
}
