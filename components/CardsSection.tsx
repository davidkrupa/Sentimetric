import { FaRegClock, FaArrowUpRightDots } from "react-icons/fa6";
import { FaFingerprint } from "react-icons/fa";
import { IoPerson, IoExpand } from "react-icons/io5";
import { RiOpenaiFill } from "react-icons/ri";

const CardsSection = () => {
  const cards = [
    {
      title: "Time Saving",
      description:
        "AI analyzing tools quickly and easily analyze your potential clients, aligning services with their values, goals, and your skills and experience.",
      icon: <FaRegClock className="size-8 text-primary" />,
    },
    {
      title: "Individual Approach",
      description:
        "Every client is unique. By treating them as such, you'll gain returning customers and referrals from happy clients. We'll assist you in discovering their values language.",
      icon: <IoPerson className="size-8 text-primary" />,
    },
    {
      title: "AI Leverage",
      description:
        "Our AI tools enhance your efficiency by automating client analysis processes, enabling you to serve more clients with the same team in less time.",
      icon: <RiOpenaiFill className="size-8 text-primary" />,
    },
    {
      title: "Business Growth",
      description:
        "Our goal is to automate tasks that AI can handle, freeing you to focus on growing your business and serving your clients to the best of your ability.",
      icon: <FaArrowUpRightDots className="size-8 text-primary" />,
    },
    {
      title: "Personal Branding",
      description:
        "We'll help you maintain a professional approach with your clients, regardless of their size. This positions you as a leader and expert in your field.",
      icon: <FaFingerprint className="size-8 text-primary" />,
    },
    {
      title: "Expanding Your Offer",
      description:
        "Our tools inspire new services that complement your current offerings, enabling you to increase profits through upselling to clients.",
      icon: <IoExpand className="size-8 text-primary" />,
    },
  ];

  return (
    <section className="mx-auto max-w-screen-xl min-h-screen px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 text-white">
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 className="text-4xl mb-6 font-bold text-muted tracking-tight">
          Elevate Your Business with Our Services
        </h2>

        <p className="font-light text-muted-foreground sm:text-lg">
          Streamline operations, enhance client satisfaction, and propel your
          business growth with our comprehensive suite of services.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-primary/10 hover:shadow-primary/10"
          >
            <div className="size-10" style={{ fontSize: "2rem" }}>
              {card.icon}
            </div>

            <h2 className="mt-4 mb-2 text-xl font-bold text-muted">
              {card.title}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardsSection;
