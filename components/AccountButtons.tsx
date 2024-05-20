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
          className="bg-slate-100 hover:bg-primary text-slate-900 hover:text-slate-100"
          onClick={() => setLoading("sign-in")}
        >
          <Link href="/sign-in">
            <span className={`${loading === "sign-in" && "text-transparent"}`}>
              Sign In
            </span>
            {loading === "sign-in" && (
              <LoadingSpinner className="absolute text-primary hover:text-white" />
            )}
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="bg-transparent hover:bg-slate-100  text-slate-100 hover:text-slate-900 border border-slate-100"
          onClick={() => setLoading("sign-up")}
        >
          <Link href="/sign-up">
            <span className={`${loading === "sign-up" && "text-transparent"}`}>
              Create Account
            </span>
            {loading === "sign-up" && (
              <LoadingSpinner className="absolute text-primary" />
            )}
          </Link>
        </Button>
      </SignedOut>
    </>
  );
};

export default AccountButtons;
