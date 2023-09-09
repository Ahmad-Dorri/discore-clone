import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

interface RequestBody {
  name: string;
  email: string;
  imageUrl: string;
}

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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const accessToken = request.headers.get("authorization");
  const body: RequestBody = await request.json();
  console.log(body);
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
  const profile = await prisma.profile.updateMany({
    where: {
      id: params.id,
    },
    data: {
      name: body.name,
      email: body.email,
      imageUrl: body.imageUrl,
    },
  });

  return new Response(JSON.stringify(profile));
}
