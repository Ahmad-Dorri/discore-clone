import { Hash } from "lucide-react";

import MobileToggle from "@/components/mobile-toggle";
import UserAvatar from "@/components/user-avatar";
import SocketIndicator from "@/components/socket-indicator";
import { ChatVideoButton } from "./chat-video-button";

type ChatHeaderProps = {
  serverId: string;
  type: "channel" | "conversation";
  name: string;
  imageUrl?: string | null;
};
const ChatHeader = ({ serverId, type, name, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-md flex h-12 items-center border-b-2 border-neutral-200 px-3 font-semibold dark:border-neutral-800 ">
      <MobileToggle serverId={serverId} className="md:hidden" />
      {type === "channel" && (
        <Hash className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
      )}
      {type === "conversation" && imageUrl && (
        <UserAvatar
          className="mr-2 h-8 w-8 md:h-8 md:w-8"
          src={imageUrl}
          name={name}
        />
      )}
      {
        <p className="text-md font-semibold text-black dark:text-white">
          {name}
        </p>
      }
      <div className="ml-auto flex items-center">
        {type === "conversation" && <ChatVideoButton />}
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
