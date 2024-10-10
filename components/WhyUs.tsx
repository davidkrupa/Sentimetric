"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MdOutlineAttachMoney } from "react-icons/md";
import { HiOutlineCpuChip, HiOutlineUsers } from "react-icons/hi2";

import door from "../lib/assets/door.webp";

const cards = [
  {
    title: "Bypass the queue of candidates",
    icon: HiOutlineUsers,
  },
  {
    title: "Bypass software filters",
    icon: HiOutlineCpuChip,
  },
  {
    title: "Better salary and additional terms",
    icon: MdOutlineAttachMoney,
  },
  // {
  //   title: "Competition Analysis",
  //   icon: FaFingerprint,
  // },
  // {
  //   title: "Trust and Authority",
  //   icon: FaFingerprint,
  // },
  // {
  //   title: "Branding",
  //   icon: FaFingerprint,
  // },
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

export default function WhyUs() {
  return (
    <section className="mx-auto flex flex-col items-center gap-16 px-4  py-16 lg:flex-row lg:justify-between lg:px-6 lg:py-24">
      <div className="relative lg:w-2/5">
        <Image
          src={door}
          alt="falling dominoes"
          width={500}
          height={500}
          className="rounded-2xl"
        />
      </div>
      <div className="max-w-[550px] text-center font-light text-slate-300 lg:w-3/5 lg:text-left">
        <h2 className="mb-8 text-balance text-4xl font-bold leading-tight tracking-tight text-slate-100">
          You Can Stand In Queue or{" "}
          <span className="bg-gradient-to-br from-blue-400 to-primary bg-clip-text font-extrabold text-transparent">
            Choose the Hidden Door
          </span>
        </h2>
        <p className="mb-8">
          Sentimetric gives you an alternative way to present yourself. By
          creating a personalized text presentation, you can bypass traditional
          systems and get directly in front of decision-makers.
        </p>

        <div className="grid select-none grid-cols-1 justify-between gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={animationVariants}
              initial="initiial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={i}
              className="group flex select-none items-center  justify-start gap-6 rounded-md border border-gray-600/40 px-4 py-2 shadow-md shadow-gray-700/30 transition delay-75 ease-out hover:border-primary/30 hover:shadow-primary/30 hover:transition-shadow"
            >
              <div className="size-6 lg:mx-0">
                <card.icon className="size-6 text-primary/90 group-hover:text-primary group-hover:transition-colors group-hover:ease-out" />
              </div>

              <h2 className="py-3 font-semibold text-slate-100">
                {card.title}
              </h2>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
