"use client";

import { redirect, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import type { RootState } from "@/store/store";
import { onClose } from "@/store/slices/modal-slice";
import Modal from "@/components/ui/modal";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";

// !compoent starts here
const LeaveServerModal = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const modal = useSelector((state: RootState) => state.modal);
  const server = modal.data.server;

  const isModalOpen = modal.isOpen && modal.type === "LeaveServer";

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      axios.patch(`/api/servers/${server?.id}/leave`);
      onClose();
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      location.reload();
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => dispatch(onClose())}
      title="Leave Server"
      description={`Are you sure you want to leave "${server?.name}"`}
    >
      <form onSubmit={onSubmit}>
        <CardContent className="flex flex-col gap-4"></CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button variant="primary" disabled={isLoading} type="submit">
            Confirm
          </Button>
          <Button
            onClick={() => dispatch(onClose())}
            variant="ghost"
            disabled={isLoading}
            type="button"
          >
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Modal>
  );
};

export default LeaveServerModal;
