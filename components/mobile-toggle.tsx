import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { Button } from "@/components/ui/button";
import ServerSidebar from "@/components/server/server-sidebar";

type MobileToggleProps = {
  className?: string;
  serverId: string;
};

const MobileToggle = ({ className, serverId }: MobileToggleProps) => {
  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <Menu className="h-5 w-5 cursor-pointer" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="flex gap-0 p-0">
          <div className="w-[72px]">
            <NavigationSidebar />
          </div>
          <ServerSidebar serverId={serverId} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileToggle;
