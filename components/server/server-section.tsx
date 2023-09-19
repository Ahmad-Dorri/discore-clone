"use client";

import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import { useDispatch } from "react-redux";

import { ServerWithMembersWithProfiles } from "@/types";
import ActionTooltip from "@/components/action-tooltip";
import { onOpen } from "@/store/slices/modal-slice";

type ServerSecionProps = {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
};

const ServerSection = ({
  label,
  role,
  sectionType,
  server,
  channelType,
}: ServerSecionProps) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400 ">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="create channel" side="top">
          <button className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300">
            <Plus
              onClick={() =>
                dispatch(onOpen("CreateChannel", { server, channelType }))
              }
              className="h-4 w-4"
            />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Manage Members" side="top">
          <button className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300">
            <Settings
              onClick={() => dispatch(onOpen("ManageMembers", { server }))}
              className="h-4 w-4"
            />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
