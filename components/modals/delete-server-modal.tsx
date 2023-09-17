"use client";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import type { RootState } from "@/store/store";
import { onClose } from "@/store/slices/modal-slice";
import Modal from "@/components/ui/modal";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";

// !compoent starts here
const DeleteServerModal = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const modal = useSelector((state: RootState) => state.modal);
  const router = useRouter();

  const server = modal.data.server;
  const isModalOpen = modal.isOpen && modal.type === "DeleteServer";

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => dispatch(onClose())}
      title="Delete Your Server."
      description="Are you Sure ?"
    >
      <form onSubmit={onSubmit}>
        <CardContent className="flex flex-col gap-4"></CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button variant="primary" disabled={isLoading} type="submit">
            Delete
          </Button>
          <Button
            type="button"
            onClick={() => {
              dispatch(onClose());
            }}
            variant="ghost"
          >
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Modal>
  );
};

export default DeleteServerModal;
