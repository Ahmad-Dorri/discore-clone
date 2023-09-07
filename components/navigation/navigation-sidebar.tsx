import { redirect } from "next/navigation";

import NavigationAction from "./navigation-aciton";
import NavigationItem from "./navigation-item";

import { currentProfile } from "@/lib/current-profile";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import SigninButton from "@/components/sign-in-button";

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
    <div className="flex h-full w-full flex-col items-center  px-4 py-3 text-primary dark:bg-[#1E1F22]">
      <NavigationAction />
      <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700 " />
      <ScrollArea className="w-full flex-1">
        {servers?.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="mt-auto flex flex-col items-center gap-4 pb-3 ">
        <ModeToggle />
        <SigninButton />
      </div>
    </div>
  );
};

export default NavigationSidebar;
