import { Channel, Member, Profile, Server } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type ServerWithMembersWithProfilsWithChannels = Server & {
  members: (Member & { profile: Profile })[];
  channels: Channel[];
};

export type ProfileWithoutPassword = Omit<
  Profile,
  "password" | "createdAt" | "updatedAt"
>;
