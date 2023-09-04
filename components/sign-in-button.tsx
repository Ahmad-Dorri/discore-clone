"use client";
import { signOut, useSession } from "next-auth/react";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  if (session && session.user) {
    return (
      <div className="ml-auto flex gap-4">
        <p className="text-sky-600">{session.user.name}</p>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    );
  }
  return (
    <Button variant={props.variant}>
      <Link href="/signIn">SignIn</Link>
    </Button>
  );
};

export default SigninButton;
