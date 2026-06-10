import { Cpu, ShieldCheck, Wrench, Zap, ArrowRight } from "lucide-react";

const features = [
  {
    icon: <Cpu size={32} />,
    title: "AI Vehicle Detection",
    desc: "Advanced YOLOv8 powered vehicle recognition with real-time object detection and bounding box visualization.",
    color: "text-orange-400",
    glow: "shadow-orange-500/20",
    border: "group-hover:border-orange-500/50",
    bg: "bg-orange-500/10",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Damage Assessment",
    desc: "Analyze dents, scratches, cracks, and external damage with intelligent AI reports and severity scoring.",
    color: "text-blue-400",
    glow: "shadow-blue-500/20",
    border: "group-hover:border-blue-500/50",
    bg: "bg-blue-500/10",
  },
  {
    icon: <Wrench size={32} />,
    title: "Repair Estimation",
    desc: "Get repair recommendations, maintenance tips, replacement suggestions, and estimated cost ranges.",
    color: "text-green-400",
    glow: "shadow-green-500/20",
    border: "group-hover:border-green-500/50",
    bg: "bg-green-500/10",
  },
  {
    icon: <Zap size={32} />,
    title: "Instant Results",
    desc: "Generate complete vehicle health reports with accessory recommendations in under 2 seconds.",
    color: "text-purple-400",
    glow: "shadow-purple-500/20",
    border: "group-hover:border-purple-500/50",
    bg: "bg-purple-500/10",
  },
];

function Features() {
  return (
    <section id="features-section" className="py-32 px-6 relative overflow-hidden">

      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-orange-500/4 blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 badge-orange mb-5">
            <Cpu size={14} />
            <span>Platform Features</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white">
            Why Choose{" "}
            <span className="gradient-text-orange">Us</span>
          </h2>
          <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
            Next generation AI-powered vehicle inspection platform built for speed, accuracy, and comprehensive insights.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className={`group card-premium p-8 border border-white/6 ${item.border} animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* ICON */}
              <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform duration-300 shadow-lg ${item.glow}`}>
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>

              {/* HOVER ARROW */}
              <div className={`flex items-center gap-1 mt-5 ${item.color} text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0`}>
                <span>Learn more</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;