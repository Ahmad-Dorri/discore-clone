"use client";
import { Member, MemberRole, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ProfileWithoutPassword } from "@/types";
import UserAvatar from "@/components/user-avatar";

type ServerMemberProps = {
  member: Member & { profile: ProfileWithoutPassword };
  server: Server;
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.ADMIN]: <ShieldAlert className="ml-2 h-4 w-4 text-rose-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="ml-2 h-4 w-4 text-indigo-500" />
  ),
};

const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams() as { memberId: string };
  const router = useRouter();
  const icon = roleIconMap[member.role];
  const onClick = () => {
    router.push(`/servers/${server?.id}/conversations/${member?.id}`);
  };

  return (
    <button
      className={cn(
        "group mb-1 flex w-full items-center  gap-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:bg-zinc-700/50",
        params.memberId === member.id && "!bg-zinc-700-20 dark:!bg-zinc-700",
      )}
      onClick={onClick}
    >
      <UserAvatar
        className="h-8 w-8 md:h-10 md:w-10"
        src={member.profile.imageUrl}
      />
      <p
        className={cn(
          "text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-300 dark:group-hover:text-zinc-300",
          params.memberId === member.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white",
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </button>
  );
};

export default ServerMember;
