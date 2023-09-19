"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import qs from "query-string";
import type { RootState } from "@/store/store";
import { onClose } from "@/store/slices/modal-slice";
import Modal from "@/components/ui/modal";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteChannelModal = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const modal = useSelector((state: RootState) => state.modal);
  const router = useRouter();
  const server = modal.data.server;
  const channel = modal.data.channel;
  const isModalOpen = modal.isOpen && modal.type === "DeleteChannel";
  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });
      const response = await axios.delete(url);
      console.log(response);
      router.push(`/servers/${server?.id}`);
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
      title="Delete Your Channel."
      description={`Are you sure you want to delete #${channel?.name}`}
    >
      <form onSubmit={onSubmit}>
        <CardContent className="flex flex-col gap-4"></CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button variant="primary" disabled={isLoading} type="submit">
            Confirm
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

export default DeleteChannelModal;
