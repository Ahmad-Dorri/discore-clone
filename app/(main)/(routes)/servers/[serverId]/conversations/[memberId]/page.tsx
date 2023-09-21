import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import { currentProfile } from "@/lib/current-profile";
import { getOrCreateConversation } from "@/lib/conversation";
import ChatHeader from "@/components/chat/chat-header";

type MemberIdPageProps = {
  params: {
    serverId: string;
    memberId: string;
  };
};
const MemberIdPage = async ({ params }: MemberIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/signIn");
  }
  const currentMember = await prisma.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId,
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="flex h-full flex-col bg-white dark:bg-[#313338]">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />
    </div>
  );
};

export default MemberIdPage;
