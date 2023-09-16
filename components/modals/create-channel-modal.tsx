"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/store/store";
import { onClose } from "@/store/slices/modal-slice";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChannelType } from "@prisma/client";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Channel name is required.")
    .refine((name) => name !== "general", {
      message: "channel name cannot be 'general'",
    }),
  type: z.nativeEnum(ChannelType),
});

type ChannelFormType = z.infer<typeof formSchema>;

const CreateChannelModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const modal = useSelector((state: RootState) => state.modal);

  const form = useForm<ChannelFormType>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: ChannelFormType) => {
    try {
      console.log("CHANNEL_CREATE_MODAL", values);
    } catch (error) {
      console.log(error);
    }
  };

  const isModalOpen = modal.isOpen && modal.type === "CreateChannel";

  const isLoading = form.formState.isSubmitting;

  return (
    <Modal
      title="Create Channel"
      description=""
      onClose={() => dispatch(onClose())}
      isOpen={isModalOpen}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
                    channel name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter Channel Name ..."
                      {...field}
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

export default CreateChannelModal;
