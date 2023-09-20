import { currentProfile } from "@/lib/current-profile";
import { ChannelType, MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

type RequestBody = {
  name: string;
  type: ChannelType;
};

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } },
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { name, type }: RequestBody = await req.json();
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("server id missing", { status: 400 });
    }

    if (!params.channelId) {
      return new NextResponse("channel id missing", { status: 400 });
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
          updateMany: {
            where: {
              id: params.channelId,
              name: {
                not: "general",
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("CHANNEL_ID_PATCH", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } },
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("server id missing", { status: 400 });
    }

    if (!params.channelId) {
      return new NextResponse("channel id missing", { status: 400 });
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
          delete: {
            id: params.channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("CHANNEL_ID_DELETE", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
