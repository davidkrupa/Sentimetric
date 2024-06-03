import { FaCheck, FaXmark } from "react-icons/fa6";

const painPoints = {
  title: "Traditional Job Application",
  features: [
    "Competing with hundreds of other candidates",
    "Job applications filtered out by software",
    // "Hard to stand out and easy to be forgotten",
    "Only vacancies seen by hundreds of people",
    "Fear of rejecting the first offer",
    "Very hard to negotiate salary and better terms",
    "Time-consuming and difficult research",
    "Difficult to make connections and network",
    "Average time to find a job is 5-6 months, up to a year",
  ],
};

const benefits = {
  title: "Job Application with Us",
  features: [
    "Bypass the queue of candidates",
    "Bypass software filters",
    // "Make a lasting impression and keep doors open for the future",
    "Access to job offers not seen by others",
    "Multiple job offers and the freedom of choice",
    "Easy to get a better salary and additional terms",
    "Quick and simple process using AI tools",
    "Easy to connect by offering value upfront",
    "Get noticed quickly, get hired quickly",
  ],
};

const PainAndBenefits = () => {
  return (
    <section
      id="benefits"
      className="flex flex-col justify-center items-center max-w-screen-xl min-h-screen mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 className="mb-6 text-4xl tracking-tight font-bold text-slate-100">
          Tired of endless job search?
        </h2>
      </div>

      {/* Pain Points */}
      <div className="flex flex-col md:flex-row gap-10 xl:gap-16">
        <div className="flex flex-col mx-auto text-center text-slate-900 bg-white rounded-2xl border border-border shadow p-6 xl:px-12 xl:py-8 w-full">
          <h3 className="mb-6 text-xl font-semibold text-left text-red-600">
            {painPoints.title}
          </h3>
          <ul className="space-y-4 text-left">
            {painPoints.features.map((feature) => (
              <li key={feature} className="flex items-center space-x-3">
                <div className="size-6">
                  <FaXmark className="text-red-600 size-6" />
                </div>
                <p className="text-base font-medium">{feature}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="flex flex-col  mx-auto text-center text-slate-900 bg-white rounded-2xl border border-border shadow p-6 xl:px-12 xl:py-8 w-full">
          <h3 className="mb-6 text-xl font-semibold text-left text-green-600">
            {benefits.title}
          </h3>
          <ul className="space-y-4 text-left">
            {benefits.features.map((feature) => (
              <li key={feature} className="flex items-center space-x-3">
                <div className="size-6">
                  <FaCheck className="text-green-600 size-6" />
                </div>
                <p className="text-base font-medium">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PainAndBenefits;
