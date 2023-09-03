import { prisma } from "@/lib/prisma";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const user = await prisma.user.create({
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
  const users = await prisma.user.findMany();

  if (!users) {
    return new Response("there is no user founded.", { status: 400 });
  }

  return new Response(JSON.stringify(users));
}
