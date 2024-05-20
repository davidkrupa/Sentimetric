import { SignUp } from "@clerk/nextjs";
import { FaRegCheckCircle } from "react-icons/fa";
import Image from "next/image";

import BackgroundGradient from "@/components/BackgroundGradient";
import logo from "@/lib/assets/logo-big.webp";

const bulletPoints = [
  {
    title: "Save time",
    description:
      "Empower your business with AI insights. Discover winning strategies and tailor services for maximum impact.",
  },
  {
    title: "Ideas on autopilot",
    description:
      "Unlock personalised ideas with ease. Let AI lead you to lucrative service opportunities tailored to company needs.",
  },
  {
    title: "Create business proposals",
    description:
      "Craft precise proposals. AI analysis ensures services align seamlessly with client requirements.",
  },
];

export default function Page() {
  return (
    <div className="flex justify-center lg:justify-end items-center min-h-screen w-full max-w-screen-xl mx-auto">
      <BackgroundGradient />
      <div className="fixed top-0 left-0 w-1/2 hidden lg:flex flex-col justify-center items-center gap-5 px-6 h-screen text-muted">
        <div className="relative flex justify-start items-center gap-3 mb-3 -left-12 text-left text-5xl font-semibold w-[360px]">
          <div className="flex justify-center items-center size-20">
            <Image src={logo} width={80} height={80} alt="Sentimetric logo" />
          </div>
          <h2 className="hidden sm:inline text-5xl text-muted font-semibold">
            Sentimetric
          </h2>
        </div>
        {bulletPoints.map((bulletPoint) => (
          <div key={bulletPoint.title} className="mb-7 w-[360px]">
            <div className="relative mb-2 text-xl font-medium leading-6">
              <FaRegCheckCircle className="absolute -left-10 size-6 text-primary/70" />
              {bulletPoint.title}
            </div>
            <div className="text-sm font-normal leading-6 text-muted-foreground">
              {bulletPoint.description}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center lg:w-1/2">
        <SignUp afterSignUpUrl="/plans" />
      </div>
    </div>
  );
}
