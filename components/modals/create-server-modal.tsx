"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import Modal from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  name: z.string().min(1, "Server name is required."),
  imageUrl: z.string().min(1, "Server image is required."),
});

type ServerFormType = z.infer<typeof formSchema>;

const CreateServerModal = () => {
  const router = useRouter();
  const modal = useModal();
  const isModalOpen = modal.isOpen && modal.type === "CreateServer";
  const form = useForm<ServerFormType>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    modal.onClose();
  };
  const onSubmit = async (values: ServerFormType) => {
    try {
      await axios.post("/api/servers", values);
      form.reset();
      router.refresh();
      modal.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      title="Customize Your Server"
      description="Give Your Server a Personality by a name and an Image. You can always change it later."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col   gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
                    server name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter Sever Name ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-YekanBakh text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUpload
                      endPoint="serverImage"
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
            <Button variant="primary" disabled={isLoading} type="submit">
              Create
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Modal>
  );
};

export default CreateServerModal;
