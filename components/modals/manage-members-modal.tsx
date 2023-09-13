import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  Check,
  Gavel,
  Loader,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";

import Modal from "@/components/ui/modal";
import { onClose } from "@/store/slices/modal-slice";
import { RootState } from "@/store/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

const roleIconMap = {
  ADMIN: <ShieldAlert className=" h-4 w-4 text-rose-500" />,
  MODERATOR: <ShieldCheck className=" h-4 w-4 text-indigo-500" />,
  GUEST: null,
};

const ManageMembersModal = () => {
  const modal = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  const [loadingId, setLoadingId] = useState("");
  const isModalOpen = modal.isOpen && modal.type === "ManageMembers";

  const { server } = modal.data;

  return (
    <Modal
      title="Manage Members"
      description={`${server?.members.length.toString()} members`}
      isOpen={isModalOpen}
      onClose={() => dispatch(onClose())}
    >
      <ScrollArea className="mt-8 max-h-[420px] pr-6 ">
        {server?.members.map((member) => (
          <div className="mb-6 flex items-center gap-2" key={member.id}>
            <UserAvatar
              name={member.profile.name}
              src={member.profile.imageUrl ?? ""}
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 text-xs font-semibold">
                {member.profile.name}
                {roleIconMap[member.role]}
              </div>
              <p className="text-xs text-zinc-500">{member.profile.email}</p>
            </div>
            {server.profileId !== member.profileId &&
              loadingId !== member.id && (
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="h-4 w-4 text-zinc-500 " />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center">
                          <ShieldQuestion className="mr-2 h-4 w-4" />
                          <span>Role</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              Guest
                              {member.role === "GUEST" && (
                                <Check className="ml-auto h-4 w-4" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ShieldCheck className="mr-2 h-4 w-4" />
                              Moderator
                              {member.role === "MODERATOR" && (
                                <Check className="ml-auto h-4 w-4" />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-rose-500">
                        <Gavel className="mr-2 h-4 w-4 text-rose-500" />
                        Kick
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            {loadingId === member.id && (
              <Loader2 className="ml-auto h-4 w-4 animate-spin text-zinc-500" />
            )}
          </div>
        ))}
      </ScrollArea>
    </Modal>
  );
};

export default ManageMembersModal;
