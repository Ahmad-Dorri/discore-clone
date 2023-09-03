"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SigninButton from "@/components/sign-in-button";

interface User {
  id: string;
  email: string;
}

const formSchema = z.object({
  name: z.string().min(1, "please enter your name"),
  email: z
    .string()
    .email("please enter a valid email")
    .min(1, "please enter your email"),
  password: z
    .string()
    .min(4, "please enter a valid password.(Atleast 4 letters."),
});

type SingUpFormValues = z.infer<typeof formSchema>;

const SingUp = () => {
  const router = useRouter();
  const form = useForm<SingUpFormValues>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: SingUpFormValues) => {
    try {
      const users: User[] = (await axios.get("/api/user")).data;
      console.log(users);
      users.map((user) => {
        if (user.email === values.email) {
          throw new Error("username already exists.");
        }
      });
      await axios.post("/api/user", values);
      toast.success("successfully signed up");
      router.push("/signIn");
    } catch (error: any) {
      toast.error(error?.message);
      router.refresh();
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Card className=" max-w-[350px]">
        <CardHeader>
          <CardTitle>SingUp</CardTitle>
          <CardDescription>Please enter your data to SingUp.</CardDescription>
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
                    <FormMessage className="font-bold text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoComplete="username"
                        placeholder="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-bold text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        autoComplete={"current-password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-bold text-red-600" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit">SignUp</Button>
              <Button type="button" variant={"destructive"}>
                <Link href={"/"}>Cancel</Link>
              </Button>
            </CardFooter>
            <div className="flex items-center justify-between p-2">
              <p className="text-sm font-thin ">Already have an account?</p>
              <SigninButton variant={"link"} />
            </div>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SingUp;
