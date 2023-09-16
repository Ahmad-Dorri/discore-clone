import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

interface RequestBody {
  name: string;
}

export async function POST(req: Request) {
  const { name }: RequestBody = await req.json();
  const { searchParams } = new URL(req.url);
  const serverId = searchParams.get("serverId");
  const profile = await currentProfile();

  if (!serverId) {
    return new NextResponse("server id missing.", { status: 400 });
  }

  if (!profile) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const server = await prisma?.server.update({
    where: {
      id: serverId,
      profileId: profile.id,
    },
    data: {
      channels: {
        create: {
          name,
          profileId: profile.id,
        },
      },
    },
  });
}
