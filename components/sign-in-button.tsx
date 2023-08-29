"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="ml-auto flex gap-4">
        <p className="text-sky-600">{session.user.name}</p>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    );
  }
  return <Button onClick={() => signIn()}>SignIn</Button>;
};

export default SigninButton;
