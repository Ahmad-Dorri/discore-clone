import { Channel, Member, Profile, Server } from "@prisma/client";

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
