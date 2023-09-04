import { signJwtAccessToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const user = await prisma.profile.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });

  const { password, ...result } = user;

  return new Response(JSON.stringify(result));
}

export async function GET() {
  const profiles = await prisma.profile.findMany();

  if (!profiles) {
    return new Response("there is no profile founded.", { status: 400 });
  }

  return new Response(JSON.stringify(profiles));
}
