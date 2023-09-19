"use client";

import { ProfileWithoutPassword } from "@/types";
import { Member, Server } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

type ServerMemberProps = {
  member: Member & { profile: ProfileWithoutPassword };
  server: Server;
};

const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();
  return (
    <button className="" onClick={() => {}}>
      {member.profile.name}
    </button>
  );
};

export default ServerMember;
