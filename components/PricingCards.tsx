import { FaCheck, FaXmark } from "react-icons/fa6";

const PricingCards = () => {
  const cards = [
    {
      title: "Starter",
      price: "$0",
      description: "Best option for personal use and basic company research.",
      features: [
        "1 business profile per month",
        "Basic profile",
        "Up to 2 AI powered company analysis per profile",
        "Analysis based business ideas creator",
      ],
      excludedFeatures: [
        "Business proposal creator",
        "Competition analysis tool",
      ],
    },
    {
      title: "Basic",
      price: "$39",
      description: "Relevant for fraalancers and small businesses.",
      features: [
        "5 business profiles per month",
        "More detailed profiles",
        "Up to 3 AI powered company analysis per profile",
        "Analysis based business ideas creator",
        "Basic business proposals creator",
      ],
      excludedFeatures: ["Competition analysis tool"],
    },
    {
      title: "Advanced",
      price: "$99",
      description: "Best for growing businesses that need more clients.",
      features: [
        "15 business profiles per month",
        "Customized profiles",
        "Up to 5 AI powered company analysis per profile",
        "Analysis based business ideas creator",
        "Advanced business proposals creator with your branding",
        "Competition analysis tool",
      ],
      excludedFeatures: [],
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center h-full max-w-screen-xl min-h-screen mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 className="mb-6 text-4xl tracking-tight font-bold text-muted">
          Designed for speed up your business
        </h2>
        <p className="font-light text-muted-foreground sm:text-lg">
          We're dedicated to helping you save time analyzing customers and their
          needs, allowing you to focus on your business.
        </p>
      </div>
      <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
        {/* Pricing Card */}
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col p-6 mx-auto max-w-lg text-center text-foreground bg-background rounded-lg border border-border shadow xl:p-8"
          >
            <h3 className="mb-4 text-2xl font-semibold">{card.title}</h3>
            <p className="font-light text-muted-foreground sm:text-lg">
              {card.description}
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">{card.price}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            {/* Card List */}
            <ul className="mb-8 space-y-4 text-left">
              <>
                {/* Included Features */}
                {card.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-3">
                    <div className="size-4">
                      <FaCheck className="text-green-500 size-4" />
                    </div>
                    <p className="text-sm">{feature}</p>
                  </li>
                ))}
                {/* Excluded Features */}
                {card.excludedFeatures?.map((feature) => (
                  <li key={feature} className="flex items-center space-x-3">
                    <div className="size-4">
                      <FaXmark className="text-destructive size-4" />
                    </div>
                    <span className="line-through text-sm">{feature}</span>
                  </li>
                ))}
              </>
            </ul>
            <a
              href="#"
              className="text-background bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Get started
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingCards;
