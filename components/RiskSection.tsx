// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import { FaFingerprint } from "react-icons/fa6";

// import queue from "../lib/assets/queue.webp";
// import { HiOutlineCpuChip, HiOutlineUsers } from "react-icons/hi2";

// const list = [
//   {
//     icon: HiOutlineUsers,
//     title: "Huge Competition",
//     description:
//       "Hundreds of candidates apply for the same job, making it tough to get noticed.",
//   },
//   {
//     icon: HiOutlineCpuChip,
//     title: "Selection by Software",
//     description:
//       "Most companies use software that filters out applications before a recruiter even sees them.",
//   },
// ];

// const animationVariants = {
//   initiial: {
//     opacity: 0,
//   },
//   animate: (index: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: 0.2 * index,
//       duration: 0.5,
//     },
//   }),
// };

// export default function RiskSection() {
//   return (
//     <section className="space-y-24 pb-16">
//       <div className="mx-auto flex flex-col items-center gap-16 px-4 lg:flex-row lg:justify-between lg:px-6">
//         <div className="max-w-[550px] order-last lg:order-first text-center font-light text-slate-400 lg:w-3/5 lg:text-left">
//           <h2 className="mb-8 text-4xl font-bold leading-tight tracking-tight text-slate-100">
//             Competing With{" "}
//             <span className="bg-gradient-to-br from-blue-400 to-primary bg-clip-text font-extrabold text-transparent">
//               Hundreds of People?{" "}
//             </span>
//           </h2>
//           <p className="mb-4">
//             Traditional CVs often get lost in a sea of hundreds of applications,
//             making it hard to stand out. Software filters also cut down the
//             chances of your application ever reaching a human recruiter.
//           </p>
//           <p className="mb-4"></p>
//           <div className="flex flex-col gap-4 sm:flex-row sm:gap-12">
//             {list.map((item, i) => (
//               <motion.div
//                 key={item.title}
//                 variants={animationVariants}
//                 initial="initiial"
//                 whileInView="animate"
//                 viewport={{ once: true }}
//                 custom={i}
//                 className="py-4 sm:w-1/2 sm:py-8"
//               >
//                 <div className="mx-auto size-10 lg:mx-0">
//                   <item.icon className="size-8 text-2xl text-primary" />
//                 </div>

//                 <h2 className="mb-2 mt-4 text-xl font-semibold text-slate-100">
//                   {item.title}
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-400">
//                   {item.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//         <div className="lg:w-2/5">
//           <Image
//             src={queue}
//             alt="queue of people"
//             width={500}
//             height={500}
//             className="rounded-2xl opacity-90"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HiOutlineCpuChip, HiOutlineUsers } from "react-icons/hi2";
import dashboard from "@/lib/assets/dashboard.png";
import { BorderBeam } from "./magicui/border-beam";

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
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 * index,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const containerVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function RiskSection() {
  return (
    <section className="relative border border-primary/50 py-24 overflow-hidden w-full rounded-[3rem]">
      {/* Blurred gradient background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-blue-800/10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl"></div>
      </div> */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-purple-600/5 to-primary/60">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 lg:px-6">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-slate-100 mb-6">
            Competing With{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text font-extrabold text-transparent">
              Hundreds of People?
            </span>
          </h2>
          <p className="text-lg text-slate-100 font-light max-w-3xl mx-auto leading-relaxed">
            Traditional CVs often get lost in a sea of hundreds of applications,
            making it hard to stand out. Software filters also cut down the
            chances of your application ever reaching a human recruiter.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {list.map((item, i) => (
            <motion.div
              key={item.title}
              variants={animationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={i}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-slate-900/30 backdrop-blur-sm border border-primary/50 hover:border-blue-600/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10 hover:-translate-y-1">
                {/* Card gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  {/* Icon container */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600/10 border border-blue-600/20 mb-6 group-hover:bg-blue-600/20 group-hover:border-blue-600/30 transition-all duration-300">
                    <item.icon className="w-7 h-7 text-blue-600" />
                  </div>

                  <h3 className="text-xl font-semibold text-slate-100 mb-3 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-slate-100 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
