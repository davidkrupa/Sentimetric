import PricingCardsContainer from "./PricingCardsContainer";

const PricingCards = () => {
  return (
    <section
      id="pricing"
      className="flex flex-col justify-center items-center h-full max-w-screen-xl min-h-screen mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 className="mb-6 text-4xl tracking-tight font-bold text-slate-100">
          Simple pricing for everyone
        </h2>
      </div>

      <PricingCardsContainer />
    </section>
  );
};

export default PricingCards;
