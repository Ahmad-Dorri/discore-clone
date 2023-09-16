import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import qs from "query-string";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { MemberRole } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Modal from "@/components/ui/modal";
import { onClose, onOpen } from "@/store/slices/modal-slice";
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
  const session = useSession();
  const router = useRouter();
  const [loadingId, setLoadingId] = useState("");
  const isModalOpen = modal.isOpen && modal.type === "ManageMembers";
  const { server } = modal.data;

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
          memberId,
        },
      });
      const response = await axios({
        method: "patch",
        url,
        data: { role },
        headers: {
          Authorization: session.data?.user.accessToken,
        },
      });
      router.refresh();
      dispatch(onOpen("ManageMembers", { server: response.data }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  const onDeleteMemeber = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
          memberId,
        },
      });
      const response = await axios({
        method: "delete",
        url,
        headers: {
          Authorization: session.data?.user.accessToken,
        },
      });
      router.refresh();
      dispatch(onOpen("ManageMembers", { server: response.data }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <Modal
      title="Manage Members"
      description={`${server?.members?.length?.toString()} members`}
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
                            <DropdownMenuItem
                              onClick={() => onRoleChange(member.id, "GUEST")}
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Guest
                              {member.role === "GUEST" && (
                                <Check className="ml-auto h-4 w-4" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                onRoleChange(member.id, "MODERATOR")
                              }
                            >
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
                      <DropdownMenuItem
                        onClick={() => onDeleteMemeber(member.id)}
                        className="text-rose-500"
                      >
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
