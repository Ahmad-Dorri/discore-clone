import { ModeToggle } from "@/components/mode-toggle";
import SigninButton from "@/components/sign-in-button";

export default function Home() {
  return (
    <div>
      this is an unprotected route.
      <SigninButton />
      <ModeToggle />
    </div>
  );
}
