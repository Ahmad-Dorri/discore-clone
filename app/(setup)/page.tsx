"use client";
import SigninButton from "@/components/sign-in-button";
import { useSession } from "next-auth/react";
import React from "react";

const Home = () => {
  const data = useSession();
  console.log(data);
  return (
    <div>
      please complete your profile
      <SigninButton />
    </div>
  );
};

export default Home;
