import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/store/store";
import Modal from "@/components/ui/modal";
import { onClose } from "@/store/slices/modal-slice";
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
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Server name is required."),
  imageUrl: z.string().min(1, "Server image is required."),
});

type ServerFormType = z.infer<typeof formSchema>;

const ServerSettingsModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal);
  const router = useRouter();

  const { server } = modal.data;
  const isModalOpen = modal.isOpen && modal.type === "EditServer";

  const form = useForm<ServerFormType>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (server) {
      form.setValue("name", server.name);
      form.setValue("imageUrl", server.imageUrl);
    }
  }, [server, form]);

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    dispatch(onClose());
  };

  const onSubmit = async (values: ServerFormType) => {
    try {
      await axios.patch(`/api/servers/${server?.id}`, values);
      router.refresh();
      dispatch(onClose());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Server Settings"
      description="Change the server settings"
      isOpen={isModalOpen}
      onClose={() => handleClose()}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col  gap-4">
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
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Modal>
  );
};

export default ServerSettingsModal;
