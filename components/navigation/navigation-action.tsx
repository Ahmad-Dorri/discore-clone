"use client";

import { Plus } from "lucide-react";
import ActionTooltip from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

const NavigationAction = () => {
  const modal = useModal();
  const addServer = () => {
    modal.onOpen("CreateServer");
  };
  return (
    <div>
      <ActionTooltip side="right" align="center" label="add a server">
        <button onClick={addServer} className="group flex items-center">
          <div className="mx-3 flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[24px] bg-background  transition-all group-hover:rounded-[16px] group-hover:bg-emerald-500 dark:bg-neutral-700">
            <Plus
              size={25}
              className="text-emerald-500 transition group-hover:text-white"
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
