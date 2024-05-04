"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

import { Button } from "./ui/button";
import LoadingSpinner from "./ui/LoadingSpinner";

type LoadingOptions = "dashboard" | "sign-in" | "sign-up" | null;

const AccountButtons = () => {
  const [loading, setLoading] = useState<LoadingOptions>(null);

  return (
    <>
      <SignedIn>
        <Button
          asChild
          variant="default"
          onClick={() => setLoading("dashboard")}
        >
          <Link href="/dashboard" className="relative">
            <span
              className={`${loading === "dashboard" && "text-transparent"}`}
            >
              Dashboard
            </span>
            {loading === "dashboard" && (
              <LoadingSpinner className="absolute text-muted" />
            )}
          </Link>
        </Button>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <Button
          asChild
          variant="secondary"
          className="hover:bg-primary hover:text-muted"
          onClick={() => setLoading("sign-in")}
        >
          <Link href="/sign-in">
            <span className={`${loading === "sign-in" && "text-transparent"}`}>
              Sign In
            </span>
            {loading === "sign-in" && (
              <LoadingSpinner className="absolute text-muted" />
            )}
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="bg-transparent border text-muted border-muted-foreground"
          onClick={() => setLoading("sign-up")}
        >
          <Link href="/sign-up">
            <span className={`${loading === "sign-up" && "text-transparent"}`}>
              Create Account
            </span>
            {loading === "sign-up" && (
              <LoadingSpinner className="absolute text-muted" />
            )}
          </Link>
        </Button>
      </SignedOut>
    </>
  );
};

export default AccountButtons;
