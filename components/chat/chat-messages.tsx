"use client";

import { Member, Message, Profile } from "@prisma/client";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import { format } from "date-fns";

import ChatItem from "./chat-item";
import ChatWelcome from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket";

type ChatMessagesProps = {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "conversationId" | "channelId";
  paramValue: string;
  type: "channel" | "conversation";
};

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

const DATE_FORMAT = "d MMM yyyy, HH:mm";

const ChatMessages = ({
  apiUrl,
  chatId,
  member,
  name,
  paramKey,
  paramValue,
  socketQuery,
  socketUrl,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      apiUrl,
      paramKey,
      paramValue,
      queryKey,
    });

  useChatSocket({
    queryKey,
    addKey,
    updateKey,
  });

  if (status === "loading") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 h-7 w-7 animate-spin text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400 ">
          Loading messages ...
        </p>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <ServerCrash className="my-4 h-7 w-7  text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400 ">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto py-4">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
      <div className="mt-auto flex flex-col-reverse">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                content={message.content}
                currentMember={member}
                deleted={message.deleted}
                fileUrl={message.fileUrl}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                isUpdated={message.createdAt !== message.updatedAt}
                id={message.id}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
                member={message.member}
                key={message.id}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
