import { FaChevronRight } from "react-icons/fa6";
import SeeExample from "./SeeExample";
import Image from "next/image";

import lookingMan from "../lib/assets/looking-man.webp";
import lookingWoman from "../lib/assets/looking-woman.webp";
import smilingWoman from "../lib/assets/smiling-woman.webp";

const Timeline = () => {
  const list = [
    {
      title: "Create Profile",
      description:
        "Create profiles for potential clients, adding your or your team's skills. Our AI tool will utilize this data to recommend tailored solutions suitable for your company's requirements.",
      content: null,
    },
    {
      title: "Analyse Company",
      description:
        "Streamline the analysis process by simply pasting key information such as the 'About Us' page, company news, or relevant job postings. Let us handle the rest.",
      content: "Content",
    },
    {
      title: "Get Inspired",
      description:
        "Leverage the collected data to inspire custom business ideas that resonate with the target company's values and goals. Provide solutions tailored to address their specific challenges, empowering you to offer your services effectively.",
      content: "Content",
    },
    {
      title: "Business Proposals",
      description:
        "The final step involves crafting personalized business proposals with the assistance of AI-generated suggestions. Target the company's unique needs and objectives effectively.",
      content: null,
    },
  ];

  return (
    <section className="flex items-start gap-4 w-full max-w-screen-xl mx-auto px-4 min-h-screen">
      <ol className="relative w-full lg:w-2/3 border-s border-border space-y-10">
        {list.map((item) => (
          <li key={item.title} className=" ms-12 max-w-[600px]">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-muted rounded-full -start-3 ring-4 ring-muted">
              {/* <FaXmark className="text-destructive" /> */}
              <FaChevronRight className="text-primary" />
            </span>
            <h3 className="flex items-center mb-1 text-lg font-medium text-muted">
              {item.title}
            </h3>
            <p className="mb-4 text-base font-normal text-muted-foreground">
              {item.description}
            </p>
            <SeeExample content={item.content} />
          </li>
        ))}
      </ol>
      <div className="hidden lg:flex flex-1 min-h-screen flex-col justify-start items-center w-1/33 my-10">
        <div className="size-48 rounded-2xl rotate-45 overflow-hidden shadow-gray-400/50 shadow-2xl">
          <Image
            alt="man looking to the left"
            width={250}
            height={250}
            className="-rotate-45 scale-150"
            src={lookingMan}
          />
        </div>
        <div className="size-48 rounded-2xl rotate-45 overflow-hidden shadow-gray-400/50 shadow-2xl">
          <Image
            alt="woman looking to the left"
            width={250}
            height={250}
            className="-rotate-45 scale-150"
            src={lookingWoman}
          />
        </div>
        <div className="size-48 rounded-2xl rotate-45 overflow-hidden shadow-amber-200/30 shadow-2xl">
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
