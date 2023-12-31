"use client";

import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ActionTooltip from "@/components/action-tooltip";
import { useDispatch } from "react-redux";
import { onOpen } from "@/store/slices/modal-slice";
import { ServerWithMembersWithProfilsWithChannels } from "@/types";

type ServerChannelProps = {
  channel: Channel;
  server: ServerWithMembersWithProfilsWithChannels;
  role?: MemberRole;
};

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const params = useParams() as { channelId: string };
  const router = useRouter();
  const dispatch = useDispatch();
  const Icon = iconMap[channel.type];

  const onClick = () => {
    return router.push(`/servers/${server.id}/channels/${channel.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group mb-1 flex w-full items-center gap-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 ",
        params.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700",
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400 " />
      <p
        className={cn(
          "line-clamp-1 text-xs font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300",
          params.channelId === channel.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white",
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(e: any) => {
                e.stopPropagation();
                return dispatch(onOpen("EditChannel", { server, channel }));
              }}
              className="hidden h-4 w-4 text-zinc-500 transition hover:text-zinc-600 group-hover:block dark:text-zinc-400 dark:hover:text-zinc-300"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={(e: any) => {
                e.stopPropagation();
                return dispatch(onOpen("DeleteChannel", { server, channel }));
              }}
              className="hidden h-4 w-4 text-zinc-500 transition hover:text-zinc-600 group-hover:block dark:text-zinc-400 dark:hover:text-zinc-300"
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto h-4 w-4 text-zinc-500 dark:text-zinc-400 " />
      )}
    </button>
  );
};

export default ServerChannel;
