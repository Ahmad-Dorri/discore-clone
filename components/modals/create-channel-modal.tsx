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
import queryString from "query-string";

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

  const serverId = modal?.data?.server?.id;

  const form = useForm<ChannelFormType>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT,
    },
  });

  const onSubmit = async (values: ChannelFormType) => {
    try {
      console.log("CHANNEL_CREATE_MODAL", values);
      const url = queryString.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId,
        },
      });
      await axios.post(url, values);
      form.reset();
      dispatch(onClose());
      router.refresh();
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
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
                    channel type
                  </FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="border-0 bg-zinc-300/50 capitalize text-black outline-none ring-offset-0 focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Select a Channel Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="capitalize"
                          >
                            {type.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
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
