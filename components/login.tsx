import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

const Login = (props: Props) => {
  return <div className={cn("", props.className)}>Login</div>;
};

export default Login;
