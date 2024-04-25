import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import logo from "../lib/assets/logo-first.png";

const Header = () => {
  return (
    <header className="w-full py-4 absolute top-0 left-0">
      <div className="flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image src={logo} width={25} height={25} alt="Sentimetric logo" />
        </Link>
        <div className="flex justify-center items-center gap-3">
          <SignedIn>
            <Button asChild variant="default">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button
              asChild
              variant="secondary"
              className="hover:bg-primary hover:text-muted"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-transparent border text-muted border-muted-foreground"
            >
              <Link href="/sign-up">Create Account</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
