import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";

interface RequestBody {
  name: string;
  imageUrl: string;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const server = await prisma.server.create({
      data: {
        imageUrl: body.imageUrl,
        name: body.name,
        profileId: profile.id,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    return new NextResponse(JSON.stringify(server));
  } catch (error) {
    console.log("SERVERS_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// export async function GET() {
//   const profiles = await prisma.profile.findMany();

//   if (!profiles) {
//     return new Response("there is no profile founded.", { status: 400 });
//   }

//   return new Response(JSON.stringify(profiles));
// }
