"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaFingerprint } from "react-icons/fa6";

import queue from "../lib/assets/queue.webp";
import { HiOutlineCpuChip, HiOutlineUsers } from "react-icons/hi2";

const list = [
  {
    icon: HiOutlineUsers,
    title: "Huge Competition",
    description:
      "Hundreds of candidates apply for the same job, making it tough to get noticed.",
  },
  {
    icon: HiOutlineCpuChip,
    title: "Selection by Software",
    description:
      "Most companies use software that filters out applications before a recruiter even sees them.",
  },
];

const animationVariants = {
  initiial: {
    opacity: 0,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 * index,
      duration: 0.5,
    },
  }),
};

export default function RiskSection() {
  return (
    <section className="space-y-24 pb-16">
      <div className="mx-auto flex flex-col items-center gap-16 px-4 lg:flex-row lg:justify-between lg:px-6">
        <div className="max-w-[550px] order-last lg:order-first text-center font-light text-slate-400 lg:w-3/5 lg:text-left">
          <h2 className="mb-8 text-4xl font-bold leading-tight tracking-tight text-slate-100">
            Competing With{" "}
            <span className="bg-gradient-to-br from-blue-400 to-primary bg-clip-text font-extrabold text-transparent">
              Hundreds of People?{" "}
            </span>
          </h2>
          <p className="mb-4">
            Traditional CVs often get lost in a sea of hundreds of applications,
            making it hard to stand out. Software filters also cut down the
            chances of your application ever reaching a human recruiter.
          </p>
          <p className="mb-4"></p>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-12">
            {list.map((item, i) => (
              <motion.div
                key={item.title}
                variants={animationVariants}
                initial="initiial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={i}
                className="py-4 sm:w-1/2 sm:py-8"
              >
                <div className="mx-auto size-10 lg:mx-0">
                  <item.icon className="size-8 text-2xl text-primary" />
                </div>

                <h2 className="mb-2 mt-4 text-xl font-semibold text-slate-100">
                  {item.title}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="lg:w-2/5">
          <Image
            src={queue}
            alt="queue of people"
            width={500}
            height={500}
            className="rounded-2xl opacity-90"
          />
        </div>
      </div>
    </section>
  );
}
