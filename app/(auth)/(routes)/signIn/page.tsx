import Login from "@/components/login";
import React from "react";

interface SignInProps {
  className?: string;
  searchParams?: Record<"callbackUrl" | "error", string>;
}

const SignInPage = (props: SignInProps) => {
  return (
    <div className="grid h-full w-full place-items-center bg-blue-200">
      <Login
        callbackUrl={props.searchParams?.callbackUrl}
        error={props.searchParams?.error}
      />
    </div>
  );
};

export default SignInPage;
