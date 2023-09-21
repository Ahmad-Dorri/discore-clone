import { Hash, Menu } from "lucide-react";
import MobileToggle from "../mobile-toggle";
type ChatHeaderProps = {
  serverId: string;
  type: "channel" | "conversation";
  name: string;
  imageUrl?: string;
};
const ChatHeader = ({ serverId, type, name, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-md flex h-12 items-center border-b-2 border-neutral-200 px-3 font-semibold dark:border-neutral-800 ">
      <MobileToggle serverId={serverId} className="md:hidden" />
      {type === "channel" && (
        <Hash className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
      )}
      {
        <p className="text-md font-semibold text-black dark:text-white">
          {name}
        </p>
      }
    </div>
  );
};

export default ChatHeader;
