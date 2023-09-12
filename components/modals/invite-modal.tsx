import { useDispatch, useSelector } from "react-redux";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

import Modal from "@/components/ui/modal";
import { onClose, onOpen } from "@/store/slices/modal-slice";
import { RootState } from "@/store/store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UseOrigin from "@/hooks/use-origin";

const InviteModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal);
  const origin = UseOrigin();
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { server } = modal.data;
  const isModalOpen = modal.isOpen && modal.type === "Invite";
  const inivteLink = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inivteLink);
    setCopied(true);
    toast.success("The Link copied to your clipboard successfully.");
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`,
      );
      dispatch(onOpen("Invite", { server: response.data }));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <Modal
        title="Invite Friends"
        description=""
        isOpen={isModalOpen}
        onClose={() => dispatch(onClose())}
      >
        <div className="p-6">
          <Label className="text-xs font-bold uppercase text-zinc-500 dark:text-indigo-100/70">
            Server invite link
          </Label>
          <div className="mt-2 flex items-center gap-x-2 ">
            <Input
              disabled={isLoading}
              defaultValue={inivteLink}
              className="border-0 bg-zinc-100/80 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button disabled={isLoading} size={"icon"} onClick={onCopy}>
              {copied ? (
                <Check className="h-4 w-4 cursor-not-allowed" />
              ) : (
                <Copy className="h-4 w-4 cursor-pointer" />
              )}
            </Button>
          </div>
          <Button
            disabled={isLoading}
            onClick={onNew}
            variant={"link"}
            size={"sm"}
            className="mt-4 text-xs text-zinc-500 dark:text-zinc-100"
          >
            Generate a new Link
            <RefreshCcw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default InviteModal;
