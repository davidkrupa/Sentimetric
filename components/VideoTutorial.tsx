import Video from "next-video";
import tutorial from "/videos/how_it_works.mp4";
import { FaStore } from "react-icons/fa6";
import {
  HiOutlineChartBar,
  HiOutlineClipboardDocumentCheck,
  HiOutlineDocumentText,
} from "react-icons/hi2";

const VideoTutorial = () => {
  return (
    <section
      id="features"
      className="w-full max-w-screen-xl mx-auto px-4 py-16"
    >
      <h2 className="text-4xl font-bold leading-tight tracking-tight text-center mb-8 text-slate-100">
        How Can We Help You?
      </h2>

      <div className="flex w-full flex-col gap-10 pt-6 lg:flex-row">
        <div className="my-auto w-full space-y-5 text-base text-slate-300 lg:pr-10">
          <p className="pb-6 text-center text-2xl underline lg:text-left">
            Our AI tools do the hard work for you.
          </p>
          <div className="group mx-auto flex max-w-[450px] items-center gap-8 lg:max-w-full">
            <HiOutlineChartBar className="mb-auto size-8 text-primary group-hover:text-primary group-hover:transition-colors group-hover:ease-out" />
            <p>Company analysis summary, easy to read before the interview.</p>
          </div>
          <div className="group mx-auto flex max-w-[450px] items-center gap-8 lg:max-w-full">
            <HiOutlineClipboardDocumentCheck className="mb-auto size-8 text-primary group-hover:text-primary group-hover:transition-colors group-hover:ease-out" />
            <p>
              Unique list of projects ideas with business value, tailored to
              your skills.
            </p>
          </div>
          <div className="group mx-auto flex max-w-[450px] items-center gap-8 lg:max-w-full">
            <HiOutlineDocumentText className="mb-auto size-8 text-primary group-hover:text-primary group-hover:transition-colors group-hover:ease-out" />
            <p>
              Text-based presentation with one button click, easy to edit in any
              text editor.
            </p>
          </div>
        </div>
        <Video
          src={tutorial}
          accentColor="#2463EB"
          className="max-w-4xl mx-auto"
        />
      </div>
    </section>
  );
};

export default VideoTutorial;
