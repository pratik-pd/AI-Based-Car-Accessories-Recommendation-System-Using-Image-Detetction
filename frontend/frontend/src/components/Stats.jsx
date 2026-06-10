import { TrendingUp } from "lucide-react";

const stats = [
  { number: "10K+",  label: "Vehicle Scans",       sub: "processed by AI" },
  { number: "95%",   label: "Detection Accuracy",  sub: "YOLOv8 precision" },
  { number: "5K+",   label: "Active Users",         sub: "and growing" },
  { number: "2s",    label: "Analysis Time",        sub: "average per scan" },
];

function Stats() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">

      {/* GRADIENT BG STRIPE */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* LABEL */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 badge-orange">
            <TrendingUp size={13} />
            <span>Platform Statistics</span>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="text-center group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {/* GLOW CIRCLE */}
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-orange-500/15 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h2 className="relative text-5xl md:text-6xl font-black gradient-text-orange shimmer-text">
                  {item.number}
                </h2>
              </div>

              <p className="text-white font-bold text-lg">{item.label}</p>
              <p className="text-gray-500 text-sm mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Stats;