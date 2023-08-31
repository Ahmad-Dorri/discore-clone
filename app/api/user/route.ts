import { db } from "@/lib/db";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const user = await db.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });

  const { password, ...result } = user;
  return new Response(JSON.stringify(result));
}
