import { prisma } from "@/lib/prisma";

interface RequestBody {
  username: string;
  password: string;
}
export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const profile = await prisma.profile.findFirst({
    where: {
      email: body.username,
    },
  });
  console.log("profile", profile);
  if (profile && body.password === profile.password) {
    const { password, ...userWithoutPassword } = profile;

    return new Response(JSON.stringify(userWithoutPassword));
  } else {
    return new Response(JSON.stringify(null), { status: 401 });
  }
}
