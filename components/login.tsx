"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

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
import SignUpButton from "./sign-up-button";
import UseOrigin from "@/hooks/use-origin";

const formSchema = z.object({
  username: z
    .string()
    .email("please enter a valid username.")
    .min(1, "please enter your username."),
  password: z
    .string()
    .min(4, "please enter your password.(At least 4 characters)"),
});

type loginFormValues = z.infer<typeof formSchema>;

interface Props {
  className?: string;
  callbackUrl?: string;
  error?: string;
}

const Login = (props: Props) => {
  const origin = UseOrigin();
  const form = useForm<loginFormValues>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = async (values: loginFormValues) => {
    try {
      // !SOMETIMES HAS ERROR SO I CHANGE IT TO ONE ROUTE FOR LOGIN
      await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: true,
        callbackUrl: props.callbackUrl ?? origin?.toString(),
      });
      // const profile = await axios.post(`api/login`, values);
      // console.log(profile.data);
      // if (!profile.data) {
      //   throw new Error("There is not such a user.");
      // }
      // await signIn();
    } catch (error) {
      toast.error("An Error happend. please try again.");
      console.log("SIGN-IN-ERROR: ", error);
    }
  };

  return (
    <>
      <Toaster />
      <Card className=" max-w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Please enter your username and password to login.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          {props.error && (
            <p className="mb-4 bg-red-200 text-center font-bold uppercase text-red-800">
              Authentication error
            </p>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage className="font-YekanBakh text-red-600" />
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
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-YekanBakh text-red-600" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit">Login</Button>
              <Button type="button" variant={"destructive"}>
                <Link href={props.callbackUrl ?? "/"}>Cancel</Link>
              </Button>
            </CardFooter>
            <SignUpButton />
          </form>
        </Form>
      </Card>
    </>
  );
};

export default Login;
