"use client";
import { signOut, useSession } from "next-auth/react";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignUpButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return null;
  }
  return (
    <div className="flex items-center justify-between p-4">
      <p className="text-sm font-thin">You dont have an account?</p>
      <Button variant={"link"}>
        <Link href="/signUp">SignUp</Link>
      </Button>
    </div>
  );
};

export default SignUpButton;
