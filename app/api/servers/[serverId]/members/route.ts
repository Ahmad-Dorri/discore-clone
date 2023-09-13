import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const server = await prisma?.server.findUnique({
      where: {
        id: params.serverId,
      },
    });
    if (!server) {
      return new NextResponse("server not find", { status: 400 });
    }

    const members = await prisma?.member.findMany({
      where: {
        serverId: server.id,
      },
    });
    return NextResponse.json(members);
  } catch (error) {
    console.log("MEMBERS_ERROR_SERVERID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
