"use client";

import { useEffect, useState } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
} from "@livekit/components-react";
import "@livekit/components-styles";

import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export const MediaRoom = ({ audio, chatId, video }: MediaRoomProps) => {
  const [token, setToken] = useState("");
  const session = useSession();
  const user = session.data?.user;
  useEffect(() => {
    if (!user?.name) return;
    const name = user.name;
    (async () => {
      try {
        const response = await fetch(
          `/api/livekit?room=${chatId}&username=${name}`,
        );
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user?.name, chatId]);

  if (token === "") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 h-7 w-7 animate-spin text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <VideoConference />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
};
