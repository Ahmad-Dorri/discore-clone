import SigninButton from "@/components/sign-in-button";
import { GetProfile } from "@/lib/get-profile";

import React from "react";
const Home = () => {
  GetProfile("123");
  return (
    <div>
      <SigninButton />
    </div>
  );
};

export default Home;
