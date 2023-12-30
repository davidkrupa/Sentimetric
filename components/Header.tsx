import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Header = () => {
  return (
    <header className="w-full border-b p-2">
      <div className="flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src="../public/next.svg"
            width={40}
            height={40}
            alt="Sentimetric logo"
          />
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
            <button className="rounded-full p-4 bg-red-500">
              <Link href="/sign-in">Login</Link>
            </button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
