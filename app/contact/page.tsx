import BackgroundGradient from "@/components/BackgroundGradient";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "Contact Us",
  robots: {
    index: false,
    follow: true,
  },
};

const Page = () => {
  return (
    <div className="max-w-screen-xl px-4 mx-auto min-h-screen flex flex-col">
      <BackgroundGradient />
      <div className="flex-grow flex flex-col justify-between gap-4 mx-auto px-2 md:px-6 lg:px-12 text-slate-400 pb-4 pt-28 relative">
        <Header />
        <div>
          <h2 className="text-slate-100 text-xl font-medium my-4">
            Contact Us
          </h2>
          <p>
            We'd love to hear from you! Whether you have questions, need
            assistance, or want to provide feedback, feel free to reach out to
            us.
          </p>
          <p className="my-2">
            Email us at:{" "}
            <a
              href="mailto:dawidkrupadev@gmail.com"
              className="text-primary underline"
            >
              dawidkrupadev@gmail.com
            </a>
          </p>

          <p>
            Your input is valuable to us, and we're here to help you make the
            most of Sentimetric.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
