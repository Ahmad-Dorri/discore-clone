import axios from "axios";
import ProfileForm from "./components/profile-form";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { verifyJwt } from "@/lib/jwt";
import { signOut } from "next-auth/react";
interface ProfilePageProps {
  params: {
    profileId: string;
  };
}
const ProfilePage = async ({ params }: ProfilePageProps) => {
  const session = await getServerSession(options);
  const user = session?.user;
  const verifiedUser = verifyJwt(user?.accessToken!);

  if (!verifiedUser) {
    signOut();
    return redirect("/");
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-indigo-500">
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
