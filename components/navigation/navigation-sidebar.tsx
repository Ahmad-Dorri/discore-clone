import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

const NavigationSidebar = async () => {
  const profile = await currentProfile();
  if (!profile) {
    redirect("/");
  }
  const servers = await prisma?.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 py-3 text-primary dark:bg-[#1E1F22]">
      NavigationSidebar
    </div>
  );
};

export default NavigationSidebar;
