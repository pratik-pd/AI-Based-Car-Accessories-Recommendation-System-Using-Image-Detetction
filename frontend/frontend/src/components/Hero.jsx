import { Upload, Sparkles, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { value: "95%",  label: "Detection Accuracy" },
  { value: "10K+", label: "Images Processed" },
  { value: "2s",   label: "Analysis Time" },
  { value: "6",    label: "Damage Types" },
];

function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#050505]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      {/* GLOW BLOBS */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/8 blur-[160px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-800/6 blur-[140px] animate-pulse" style={{animationDelay: "2s"}} />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20">

        {/* BADGE */}
        <div className="inline-flex items-center gap-2 badge-orange mb-8 animate-fade-in-down">
          <div className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
          <span>AI-Powered Vehicle Intelligence Platform</span>
        </div>

        {/* HEADLINE */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] max-w-5xl animate-fade-in-up delay-100">
          Smart Vehicle
          <br />
          <span className="gradient-text-orange text-glow-orange">
            Damage Analysis
          </span>
        </h1>

        {/* SUB */}
        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed animate-fade-in-up delay-200">
          Upload any vehicle image and receive instant AI-powered damage detection,
          health scoring, repair cost estimation, and personalized accessory recommendations.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in-up delay-300">
          <Link
            to="/detect"
            className="btn-primary flex items-center gap-3 text-base px-8 py-4"
          >
            <Upload size={20} />
            Start AI Scan
            <ArrowRight size={18} />
          </Link>

          <button
            onClick={() => document.getElementById("features-section")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-glass flex items-center gap-3 text-base px-8 py-4"
          >
            <Play size={18} />
            Learn More
          </button>
        </div>

        {/* TRUST LINE */}
        <p className="text-gray-600 text-sm mt-6 animate-fade-in-up delay-400">
          ✓ No account required to explore &nbsp;·&nbsp; ✓ Results in under 2 seconds
        </p>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-4xl animate-fade-in-up delay-500">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-5 hover:border-orange-500/40 transition-all duration-500 hover:-translate-y-2 group"
            >
              <h3 className="text-3xl font-black gradient-text-orange group-hover:text-glow-orange">
                {stat.value}
              </h3>
              <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* SCROLL INDICATOR */}
        <div className="mt-16 animate-bounce opacity-40">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-orange-400 rounded-full" />
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;