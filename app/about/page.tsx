import BackgroundGradient from "@/components/BackgroundGradient";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "About Us",
  robots: {
    index: false,
    follow: true,
  },
};

const Page = () => {
  return (
    <div className="max-w-screen-xl px-4 mx-auto min-h-screen flex flex-col">
      <BackgroundGradient />
      <div className="flex-grow flex flex-col justify-between gap-4 mx-auto px-2 md:px-6 lg:px-12 text-slate-500 pb-4 pt-28 relative">
        <Header />
        <div>
          <h2 className="text-slate-100 text-xl font-medium my-4">About Us</h2>
          <p>
            At Sentimetric, we revolutionize the job application process by
            leveraging the power of AI to help you stand out to recruiters. We
            know the traditional job search can be tedious and competitive,
            which is why we created a tool that gives you the edge you need to
            succeed.
          </p>
          <h2 className="text-slate-100 text-xl font-medium my-4">
            Our Mission
          </h2>
          <p>
            Our mission is simple: to make recruiters need to hire you. We aim
            to transform your job search experience by crafting AI-generated,
            job-winning presentations that highlight your skills and demonstrate
            how you can boost profits in your target companies.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
