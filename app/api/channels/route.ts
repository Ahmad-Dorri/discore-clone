import { currentProfile } from "@/lib/current-profile";
import { ChannelType, MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

interface RequestBody {
  name: string;
  type: ChannelType;
}

export async function POST(req: Request) {
  try {
    const { name, type }: RequestBody = await req.json();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const profile = await currentProfile();

    if (!serverId) {
      return new NextResponse("server id missing.", { status: 400 });
    }

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (name === "general") {
      return new NextResponse("name cannot be 'general'", { status: 400 });
    }

    const server = await prisma?.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log(error);
    return new NextResponse("internal error", { status: 500 });
  }
}
