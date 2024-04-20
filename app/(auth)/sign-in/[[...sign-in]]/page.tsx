import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="hidden md:flex flex-col justify-center items-center gap-5 flex-1 h-screen bg-gradient-to-r from-violet-600 to-indigo-600">
        <h1 className="text-5xl font-bold text-white">Sign In</h1>
        <p className="text-2xl text-white font-semibold">
          Access your dashboard
        </p>
      </div>
      <div className="flex justify-center items-center flex-1 pl-2">
        <SignIn afterSignInUrl="/dashboard" />
      </div>
    </div>
  );
}
