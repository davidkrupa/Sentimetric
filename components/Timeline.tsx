import { FaChevronRight } from "react-icons/fa6";
import SeeExample from "./SeeExample";
import Image from "next/image";

import lookingMan from "../lib/assets/looking-man.webp";
import lookingWoman from "../lib/assets/looking-woman.webp";
import smilingWoman from "../lib/assets/smiling-woman.webp";

const Timeline = () => {
  const list = [
    {
      title: "Dream Job Profile",
      description:
        "First, create your profile by entering details such as company name, industry, your target position, and your skills. It's easy to manage multiple companies without needing to remember everything.",
      time: "3",
      content: null,
    },
    {
      title: "Company Analysis",
      description:
        "Gather information from the company's website or any other source. You'll copy and paste useful content like the About Us page, job offers, company news, or even user opinions - anything you find helpful. AI will do the rest.",
      time: "10",
      content: null,
    },
    {
      title: "Summary and Ideas",
      description:
        "Our AI tools will quickly analyze your profile along with the company information you've provided, and its own industry knowledge. You'll get a company summary useful for interviews and a list of project ideas to choose from in the final step.",
      time: "1",
      content: null,
    },
    {
      title: "Creating Presentation",
      description: `Choose the projects that you want to include in your presentation. Our tool will generate a complete presentation for you. Each project has an explanation together with SWOT analysis. It's an easy, effective, and unique way to impress any recruiter and land your dream job.`,
      time: "1",
      content: null,
    },
  ];

  return (
    <section
      id="features"
      className="flex items-start gap-4 w-full max-w-screen-xl mx-auto px-4 py-10 min-h-screen"
    >
      <ol className="relative w-full lg:w-2/3 border-s border-border space-y-10">
        {list.map((item) => (
          <li key={item.title} className=" ms-12 max-w-[600px]">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-slate-100 rounded-full -start-3 ring-4 ring-slate-100">
              <FaChevronRight className="text-primary" />
            </span>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-slate-100">
                {item.title}
              </h3>
              <p className="mr-6 text-sm text-slate-500/70">
                Time: {item.time}min
              </p>
            </div>
            <p className="mb-4 text-base font-normal text-slate-500">
              {item.description}
            </p>
            <SeeExample content={item.content} />
          </li>
        ))}
      </ol>
      <div className="hidden lg:flex flex-1 min-h-screen flex-col justify-start items-center w-1/33 my-10">
        <div className="size-48 rounded-2xl rotate-45 overflow-hidden shadow-gray-400/50 shadow-2xl hover:-translate-y-4 transition-all">
          <Image
            alt="man looking to the left"
            width={250}
            height={250}
            className="-rotate-45 scale-150"
            src={lookingMan}
          />
        </div>
        <div className="size-48 rounded-2xl rotate-45 overflow-hidden shadow-gray-400/50 shadow-2xl hover:-translate-y-4 transition-all">
          <Image
            alt="woman looking to the left"
            width={250}
            height={250}
            className="-rotate-45 scale-150"
            src={lookingWoman}
          />
        </div>
        <div className="size-48 rounded-2xl rotate-45 overflow-hidden shadow-amber-200/30 shadow-2xl hover:-translate-y-4 transition-all">
          <Image
            alt="smiling woman"
            width={250}
            height={250}
            className="-rotate-45 scale-150"
            src={smilingWoman}
          />
        </div>
      </div>
    </section>
  );
};

export default Timeline;
