import Video from "next-video";
import tutorial from "/videos/how_it_works.mp4";

const VideoTutorial = () => {
  return (
    <section
      id="features"
      className="w-full max-w-screen-xl mx-auto px-4 py-10 min-h-screen"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-slate-100">
        How To Use Sentimetric
      </h2>
      <Video
        src={tutorial}
        accentColor="#2463EB"
        className="max-w-4xl mx-auto"
      />
    </section>
  );
};

export default VideoTutorial;
