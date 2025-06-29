import { FaRegClock, FaArrowUpRightDots } from "react-icons/fa6";
import { FaFingerprint } from "react-icons/fa";
import { IoPerson, IoExpand } from "react-icons/io5";
import { LuMousePointerClick } from "react-icons/lu";

const CardsSection = () => {
  const cards = [
    {
      title: "Time Saving",
      description:
        "AI automation speeds up the process of researching and analyzing companies, providing you with a custom presentation in less than half an hour.",
      icon: <FaRegClock className="size-8 text-primary" />,
    },
    {
      title: "Easy to Use",
      description:
        "Our tools are designed to be super easy to use. The step-by-step process allows even non-technical users with zero experience in research or company analysis to feel confident.",
      icon: <LuMousePointerClick className="size-8 text-primary" />,
    },
    {
      title: "Highlight Your Skills",
      description:
        "A custom-made presentation proves you are the perfect candidate by showing ideas that combine your skills with the company's goals and values, even if you are changing career paths.",
      icon: <IoPerson className="size-8 text-primary" />,
    },
    {
      title: "Individual Approach",
      description:
        "Each company analysis, summary, and final presentation are unique and custom-tailored. Access all information easily without needing to memorize anything.",
      icon: <FaFingerprint className="size-8 text-primary" />,
    },
    {
      title: "Higher Salary",
      description:
        "Providing so much value upfront puts you ahead of your competition. This makes it easier to negotiate a higher salary. You're chosen for being the right person, not the cheapest one.",
      icon: <FaArrowUpRightDots className="size-8 text-primary" />,
    },
    {
      title: "More Opportunities",
      description:
        "Become someone that top companies compete to work with. More opportunities make it easier to make the right choices, negotiate bonuses, and get promoted.",
      icon: <IoExpand className="size-8 text-primary" />,
    },
  ];

  return (
    <section
      id="benefits"
      className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12 text-white"
    >
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 className="text-4xl mb-6 font-bold text-slate-100 tracking-tight">
          Get More Interviews Without Effort
        </h2>

        <p className="font-light text-slate-300 sm:text-lg">
          Prove you are the perfect candidate for the company, even if you are
          changing career paths or lack the required experience.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="block rounded-xl bg-primary/10 border border-blue-900/70 p-8 shadow-xl transition hover:border-primary/10 hover:shadow-primary/10"
          >
            <div className="size-10" style={{ fontSize: "2rem" }}>
              {card.icon}
            </div>

            <h2 className="mt-4 mb-4 text-xl font-bold text-primary">
              {card.title}
            </h2>

            <p className="mt-1 text-sm text-slate-300">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardsSection;
