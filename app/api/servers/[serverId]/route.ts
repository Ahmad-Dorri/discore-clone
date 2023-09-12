import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

interface RequestBody {
  name: string;
  imageUrl: string;
}

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const body: RequestBody = await req.json();
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("there is no server founded", { status: 400 });
    }
    const response = await prisma?.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name: body.name,
        imageUrl: body.imageUrl,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    console.log(
      "🚀 ~ file: route.ts:12 ~ PATCH ~ error:[SERVER_ID_PATCH]",
      error,
    );
    return new NextResponse("Internal error", { status: 500 });
  }
}
