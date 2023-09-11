import { useDispatch, useSelector } from "react-redux";

import Modal from "@/components/ui/modal";
import { onClose } from "@/store/slices/modal-slice";
import { RootState } from "@/store/store";

const InviteModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal);

  const isModalOpen = modal.isOpen && modal.type === "Invite";

  return (
    <Modal
      title="Invite others"
      description="Invite others"
      isOpen={isModalOpen}
      onClose={() => dispatch(onClose())}
    >
      hello
    </Modal>
  );
};

export default InviteModal;
