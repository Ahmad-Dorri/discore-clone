import Login from "@/components/login";
import React from "react";

interface SignInProps {
  className?: string;
  searchParams?: Record<"callbackUrl" | "error", string>;
}

const SignInPage = (props: SignInProps) => {
  return (
    <Login
      callbackUrl={props.searchParams?.callbackUrl}
      error={props.searchParams?.error}
    />
  );
};

export default SignInPage;
