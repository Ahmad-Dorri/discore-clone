import { signJwtAccessToken } from "@/lib/jwt";
import { db } from "@/lib/db";

interface RequestBody {
  username: string;
  password: string;
}
export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const user = await db.user.findFirst({
    where: {
      email: body.username,
    },
  });

  if (user && body.password === user.password) {
    const { password, ...userWithoutPassword } = user;
    const accessToken = signJwtAccessToken(userWithoutPassword);
    const result = {
      ...userWithoutPassword,
      accessToken,
    };

    return new Response(JSON.stringify(result));
  } else {
    return new Response(JSON.stringify(null), { status: 401 });
  }
}
