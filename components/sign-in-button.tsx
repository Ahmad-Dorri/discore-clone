"use client";
import { signOut, useSession } from "next-auth/react";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  return (
    <Button>
      <Link href="/signIn">SignIn</Link>
    </Button>
  );
};

export default SigninButton;
