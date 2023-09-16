import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

interface RequestBody {
  name: string;
  email: string;
  imageUrl: string;
}

export async function GET(
  request: Request,
  { params }: { params: { profileId: string } },
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
      id: params.profileId,
    },
  });

  return new Response(JSON.stringify(profile));
}
