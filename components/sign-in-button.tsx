"use client";
import { signOut, useSession } from "next-auth/react";

import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface SigninButtonProps {
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

const SigninButton = (props: SigninButtonProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <Button variant={props.variant}>
        <Link href="/signIn">SignIn</Link>
      </Button>
    );
  }
  return (
    // todo: avatar that has name, image, logout functionallity
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={session.user.imageUrl} />
          <AvatarFallback className="text-xs font-bold lowercase">
            User
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-auto flex-col gap-4 text-center"
        side="right"
      >
        <p>{session.user.name}</p>
        <Button
          onClick={() => router.push(`/${session.user.id}`)}
          variant={"ghost"}
        >
          Profile
        </Button>
        <Button variant={"destructive"} onClick={() => signOut()}>
          logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default SigninButton;
