"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/file-upload";
import UseOrigin from "@/hooks/use-origin";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(1, "please enter your name."),
  email: z.string().email("please enter a valid email."),
  imageUrl: z.string().min(1, "please enter a valid image"),
});

type ProfileValues = z.infer<typeof formSchema>;

const ProfileForm = () => {
  const router = useRouter();
  const { data } = useSession();
  const origin = UseOrigin() ?? "/";

  const user = data?.user;
  const form = useForm<ProfileValues>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      imageUrl: user?.imageUrl || undefined,
    },
  });
  if (!user) {
    return router.push("/");
  }
  const onSubmit = async (values: ProfileValues) => {
    try {
      await axios.patch(`/api/profile/${user.id}`, values);
      signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className=" max-w-[350px]">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Please complete the form base on your information.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
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
                      endPoint="profileImage"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" variant={"primary"}>
              Change
            </Button>
            {/* //? ROUTER.BACK DOESNT WORK AS ACCPECTED */}
            <Button
              onClick={() => {
                window.location.replace(origin);
              }}
              variant={"destructive"}
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ProfileForm;
