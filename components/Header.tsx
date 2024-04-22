import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import logo from "../lib/assets/logo-first.png";

const Header = () => {
  return (
    <header className="w-full p-2 absolute top-0 left-0">
      <div className="flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image src={logo} width={25} height={25} alt="Sentimetric logo" />
        </Link>

        <div className="flex justify-center items-center gap-3">
          <SignedIn>
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: "default" })}
            >
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "default" })}
            >
              Sign In
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
