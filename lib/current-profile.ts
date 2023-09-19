import { options } from "@/app/api/auth/[...nextauth]/options";
import { ProfileWithoutPassword } from "@/types";
import { getServerSession } from "next-auth";

export const currentProfile = async () => {
  const session = await getServerSession(options);
  if (!session) {
    return null;
  }
  const user = session.user as ProfileWithoutPassword;
  return user;
};
