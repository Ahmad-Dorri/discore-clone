import SigninButton from "@/components/sign-in-button";
import { getServerSession } from "next-auth";

import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
const Home = async () => {
  const session = await getServerSession(options);
  console.log(session);
  return (
    <div>
      <SigninButton />
    </div>
  );
};

export default Home;
