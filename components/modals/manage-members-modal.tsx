import { useDispatch, useSelector } from "react-redux";

import Modal from "@/components/ui/modal";
import { onClose } from "@/store/slices/modal-slice";
import { RootState } from "@/store/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";
import { ShieldAlert, ShieldCheck } from "lucide-react";

const roleIconMap = {
  ADMIN: <ShieldAlert className=" h-4 w-4 text-rose-500" />,
  MODERATOR: <ShieldCheck className=" h-4 w-4 text-indigo-500" />,
  GUEST: null,
};

const ManageMembersModal = () => {
  const modal = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
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
          </div>
        ))}
      </ScrollArea>
    </Modal>
  );
};

export default ManageMembersModal;
