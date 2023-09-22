import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ChatHeader from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
type ChannelIdPageProps = {
  params: {
    serverId: string;
    channelId: string;
  };
};

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/signIn");
  }

  const channel = await prisma.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await prisma.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    return redirect("/");
  }

  return (
    <div className="flex h-full flex-col bg-white dark:bg-[#313338]">
      <ChatHeader
        serverId={channel.serverId}
        type="channel"
        name={channel.name}
      />
      <div className="flex-1">future messages</div>
      <ChatInput
        type="channel"
        name={channel.name}
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
          profileId: profile.id,
        }}
      />
    </div>
  );
};

export default ChannelIdPage;
