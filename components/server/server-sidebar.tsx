import { redirect } from "next/navigation";
import { ChannelType, MemberRole } from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import ServerHeader from "./server-header";
import ServerSearch from "./server-search";
import ServerSection from "./server-section";

import { currentProfile } from "@/lib/current-profile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ServerChannel from "./server-channel";
import ServerMember from "./server-member";
import { ProfileWithoutPassword } from "@/types";

interface ServerSidebarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
};

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  const server = await prisma?.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const textChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT,
  );
  const audioChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO,
  );
  const videoChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO,
  );
  const members = server.members.filter(
    (member) => member.profileId !== profile.id,
  );

  const role = server.members.find((member) => member.profileId === profile.id)
    ?.role;

  return (
    <div className="flex h-full w-full flex-col bg-[#f2f3f5] text-primary dark:bg-[#2b2d31]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Audio Channels",
                type: "channel",
                data: audioChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },

              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="my-2 rounded-md bg-zinc-200 dark:bg-zinc-700" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              label="Text Channels"
              channelType={ChannelType.TEXT}
              role={role}
              server={server}
            />
            <div className="space-y-2">
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={role}
                />
              ))}
            </div>
            {!!audioChannels?.length && (
              <div className="mb-2">
                <ServerSection
                  sectionType="channels"
                  label="Audio Channels"
                  channelType={ChannelType.AUDIO}
                  role={role}
                  server={server}
                />
                <div className="space-y-2">
                  {audioChannels.map((channel) => (
                    <ServerChannel
                      key={channel.id}
                      channel={channel}
                      server={server}
                      role={role}
                    />
                  ))}
                </div>
              </div>
            )}
            {!!videoChannels?.length && (
              <div className="mb-2">
                <ServerSection
                  sectionType="channels"
                  label="Video Channels"
                  channelType={ChannelType.VIDEO}
                  role={role}
                  server={server}
                />

                <div className="space-y-2">
                  {videoChannels.map((channel) => (
                    <ServerChannel
                      key={channel.id}
                      channel={channel}
                      server={server}
                      role={role}
                    />
                  ))}
                </div>
              </div>
            )}
            {!!members?.length && (
              <div className="mb-2">
                <ServerSection
                  sectionType="members"
                  label="Members"
                  role={role}
                  server={server}
                />
                {members.map((member) => (
                  <ServerMember
                    server={server}
                    member={member}
                    key={member.id}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
