// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import { MdOutlineAttachMoney } from "react-icons/md";
// import { HiOutlineCpuChip, HiOutlineUsers } from "react-icons/hi2";

// import door from "../lib/assets/door.webp";

// const cards = [
//   {
//     title: "Bypass the queue of candidates",
//     icon: HiOutlineUsers,
//   },
//   {
//     title: "Bypass software filters",
//     icon: HiOutlineCpuChip,
//   },
//   {
//     title: "Better salary and additional terms",
//     icon: MdOutlineAttachMoney,
//   },
//   // {
//   //   title: "Competition Analysis",
//   //   icon: FaFingerprint,
//   // },
//   // {
//   //   title: "Trust and Authority",
//   //   icon: FaFingerprint,
//   // },
//   // {
//   //   title: "Branding",
//   //   icon: FaFingerprint,
//   // },
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

// export default function WhyUs() {
//   return (
//     <section className="mx-auto flex flex-col items-center gap-16 px-4  py-16 lg:flex-row lg:justify-between lg:px-6 lg:py-24">
//       <div className="relative lg:w-2/5">
//         <Image
//           src={door}
//           alt="falling dominoes"
//           width={500}
//           height={500}
//           className="rounded-2xl"
//         />
//       </div>
//       <div className="max-w-[550px] text-center font-light text-slate-300 lg:w-3/5 lg:text-left">
//         <h2 className="mb-8 text-balance text-4xl font-bold leading-tight tracking-tight text-slate-100">
//           You Can Stand In Queue or{" "}
//           <span className="bg-gradient-to-br from-blue-400 to-primary bg-clip-text font-extrabold text-transparent">
//             Choose the Hidden Door
//           </span>
//         </h2>
//         <p className="mb-8">
//           Sentimetric gives you an alternative way to present yourself. By
//           creating a personalized text presentation, you can bypass traditional
//           systems and get directly in front of decision-makers.
//         </p>

//         <div className="grid select-none grid-cols-1 justify-between gap-4">
//           {cards.map((card, i) => (
//             <motion.div
//               key={card.title}
//               variants={animationVariants}
//               initial="initiial"
//               whileInView="animate"
//               viewport={{ once: true }}
//               custom={i}
//               className="group flex select-none items-center  justify-start gap-6 rounded-md border border-gray-600/40 px-4 py-2 shadow-md shadow-gray-700/30 transition delay-75 ease-out hover:border-primary/30 hover:shadow-primary/30 hover:transition-shadow"
//             >
//               <div className="size-6 lg:mx-0">
//                 <card.icon className="size-6 text-primary/90 group-hover:text-primary group-hover:transition-colors group-hover:ease-out" />
//               </div>

//               <h2 className="py-3 font-semibold text-slate-100">
//                 {card.title}
//               </h2>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { MdOutlineAttachMoney } from "react-icons/md";
import { HiOutlineCpuChip, HiOutlineUsers } from "react-icons/hi2";
import { FaFingerprint } from "react-icons/fa6";

const cards = [
  {
    title: "Skip the line of candidates",
    description:
      "Skip the traditional application process and get noticed immediately",
    icon: HiOutlineUsers,
    size: "large",
    gradient: "from-blue-600/20 to-cyan-600/10",
  },
  {
    title: "Trust and Authority",
    description: "Build credibility with decision-makers",
    icon: FaFingerprint,
    size: "small",
    gradient: "from-orange-600/20 to-red-600/10",
  },
  {
    title: "Bypass software filters",
    description: "Get directly to human recruiters",
    icon: HiOutlineCpuChip,
    size: "medium",
    gradient: "from-purple-600/20 to-blue-600/10",
  },
  {
    title: "Better salary and additional terms",
    description: "Negotiate from a position of strength",
    icon: MdOutlineAttachMoney,
    size: "medium",
    gradient: "from-green-600/20 to-blue-600/10",
  },
  {
    title: "Competition Analysis",
    description: "Understand your market position",
    icon: FaFingerprint,
    size: "small",
    gradient: "from-indigo-600/20 to-purple-600/10",
  },
];

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
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function WhyUs() {
  return (
    <section className="relative py-12 overflow-hidden">
      {/* Background gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent">
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div> */}

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-pretty max-w-5xl mx-auto font-bold leading-tight tracking-tight text-slate-100 mb-6">
            You Can Stand in Line or{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text font-extrabold text-transparent">
              Choose the Hidden Door
            </span>
          </h2>
          <p className="text-lg text-slate-100 font-light max-w-3xl mx-auto leading-relaxed mb-12">
            Sentimetric gives you an alternative way to present yourself. By
            creating a personalized text presentation, you can bypass
            traditional systems and get directly in front of decision-makers.
          </p>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={cardVariants}
                className={`
                  group relative overflow-hidden rounded-2xl bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 
                  hover:border-blue-600/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-600/10 hover:-translate-y-2
                  ${card.size === "large" ? "md:col-span-2 lg:col-span-3 md:row-span-2" : ""}
                  ${card.size === "medium" ? "md:col-span-2 lg:col-span-2" : ""}
                  ${card.size === "small" ? "md:col-span-2 lg:col-span-1" : ""}
                `}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* Content */}
                <div
                  className={`relative z-10 p-6 h-full flex flex-col ${card.size === "large" ? "justify-center text-left" : "justify-start text-left"}`}
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 mb-4 group-hover:bg-blue-600/20 group-hover:border-blue-600/30 transition-all duration-300 lg:self-start">
                    <card.icon className="w-6 h-6 text-blue-600" />
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-semibold text-slate-100 mb-2 group-hover:text-white transition-colors duration-300 ${
                      card.size === "large" ? "text-2xl md:text-5xl" : "text-lg"
                    }`}
                  >
                    {card.title}
                  </h3>

                  {/* Description - only show on larger cards */}
                  {(card.size === "large" || card.size === "medium") && (
                    <p
                      className={`text-slate-200 group-hover:text-slate-100 transition-colors duration-300 leading-relaxed ${
                        card.size === "large" ? "text-base" : "text-sm"
                      }`}
                    >
                      {card.description}
                    </p>
                  )}

                  {/* Decorative element for large card */}
                  {card.size === "large" && (
                    <div className="absolute bottom-4 right-4 w-20 h-20 bg-blue-600/5 rounded-full blur-xl group-hover:bg-blue-600/10 transition-all duration-500"></div>
                  )}
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
