"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import qs from "query-string";

import Modal from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { onClose } from "@/store/slices/modal-slice";

const formSchema = z.object({
  fileUrl: z.string().min(1, "Attachment is required."),
});

type MessageFileType = z.infer<typeof formSchema>;

const MessageFileModal = () => {
  const router = useRouter();
  const modal = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  const form = useForm<MessageFileType>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const isModalOpen = modal.type === "MessageFile" && modal.isOpen;

  const onSubmit = async (values: MessageFileType) => {
    try {
      const url = qs.stringifyUrl({
        url: modal.data.apiUrl || "",
        query: modal.data.query,
      });
      axios.post(url, {
        ...values,
        content: values.fileUrl,
      });
      form.reset();
      router.refresh();
      dispatch(onClose());
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    dispatch(onClose());
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      title="Add an attachment"
      description="Send a file as an attachment"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="fileUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUpload
                      endPoint="messageFile"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="font-YekanBakh text-red-600" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex">
            <Button
              className="w-full"
              variant="primary"
              disabled={isLoading}
              type="submit"
            >
              Send
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Modal>
  );
};

export default MessageFileModal;
