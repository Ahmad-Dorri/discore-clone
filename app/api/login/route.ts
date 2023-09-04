import { signJwtAccessToken } from "@/lib/jwt";
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
  if (profile && body.password === profile.password) {
    const { password, ...userWithoutPassword } = profile;
    const accessToken = signJwtAccessToken(userWithoutPassword);
    const result = { ...userWithoutPassword, accessToken };
    //!updating the profile to change the accesstoken
    await prisma.profile.updateMany({
      where: {
        email: body.username,
      },
      data: {
        ...result,
      },
    });
    return new Response(JSON.stringify(result));
  } else {
    return new Response(JSON.stringify(null), { status: 401 });
  }
}
