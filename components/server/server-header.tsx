"use client";
import { ServerWithMembersWithProfiles } from "@/types";

import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { onOpen } from "@/store/slices/modal-slice";

type ServerHeaderProps = {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
};

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const dispatch = useDispatch();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="flex h-12 w-full items-center border-b-2 border-neutral-200 px-3 text-base font-semibold transition hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50 ">
          {server.name}
          <ChevronDown className="ml-auto h-4 w-4 object-contain" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-4  text-xs font-medium text-black dark:text-neutral-400">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => dispatch(onOpen("Invite", { server }))}
            className="cursor-pointer px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400"
          >
            Invite People
            <UserPlus className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => dispatch(onOpen("EditServer", { server }))}
            className="cursor-pointer px-3 py-2 text-sm"
          >
            Server Settings
            <Settings className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm">
            Manage Members
            <Users className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm">
            Create Channel
            <PlusCircle className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-rose-500">
            Delete Server
            <Trash className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-rose-500">
            Leave Server
            <LogOut className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
