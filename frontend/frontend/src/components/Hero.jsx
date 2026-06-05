import { Upload, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">

        {/* BADGE */}
        <div className="mb-6 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md">
          <span className="text-orange-400 text-sm font-semibold">
            AI Powered Vehicle Intelligence
          </span>
        </div>

        {/* TITLE */}
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight max-w-5xl">
          Smart Vehicle
          <span className="text-orange-500"> Analysis </span>
          Using Artificial Intelligence
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
          Upload a vehicle image and receive instant AI-powered
          detection, damage assessment, vehicle health insights,
          repair estimation, and personalized accessory recommendations.
        </p>

        {/* BUTTONS */}
        {/* <div className="flex flex-col sm:flex-row gap-4 mt-10">

          <button
            onClick={() =>
              document
                .getElementById("upload-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-2xl font-bold transition"
          >
            <Upload size={20} />
            Analyze Vehicle
          </button>

          <button
            className="flex items-center justify-center gap-2 border border-white/20 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition"
          >
            <Sparkles size={20} />
            Learn More
          </button>

        </div> */}

        <div className="flex flex-col sm:flex-row gap-4 mt-10">

  <Link
    to="/detect"
    className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-2xl font-bold transition"
  >
    <Upload size={20} />
    Start AI Scan
  </Link>

  <button
    className="flex items-center justify-center gap-2 border border-white/20 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition"
  >
    <Sparkles size={20} />
    Learn More
  </button>

</div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16 w-full max-w-5xl">

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-3xl font-black text-orange-500">95%</h3>
            <p className="text-gray-300 mt-2">Detection Accuracy</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-3xl font-black text-orange-500">10K+</h3>
            <p className="text-gray-300 mt-2">Images Processed</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-3xl font-black text-orange-500">2 Sec</h3>
            <p className="text-gray-300 mt-2">Analysis Time</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-3xl font-black text-orange-500">500+</h3>
            <p className="text-gray-300 mt-2">Accessories</p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;