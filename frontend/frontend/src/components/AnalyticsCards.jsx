import { BadgeCheck, IndianRupee, Car, Activity } from "lucide-react";

const cardConfig = [
  {
    key: "confidence",
    title: "AI Confidence",
    icon: BadgeCheck,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    glow: "hover:shadow-orange-500/10",
  },
  {
    key: "brand",
    title: "Vehicle Brand",
    icon: Car,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "hover:shadow-blue-500/10",
  },
  {
    key: "repairCost",
    title: "Est. Repair Cost",
    icon: IndianRupee,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    glow: "hover:shadow-green-500/10",
  },
  {
    key: "vehicleHealth",
    title: "Vehicle Health",
    icon: Activity,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    glow: "hover:shadow-cyan-500/10",
  },
];

function AnalyticsCards({ brand, repairCost, vehicleHealth, confidence }) {
  const values = {
    confidence: confidence ? `${confidence}%` : "N/A",
    brand: brand || "Unknown",
    repairCost: repairCost || "N/A",
    vehicleHealth: vehicleHealth || "N/A",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cardConfig.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`glass rounded-[20px] p-6 border ${card.border} hover:-translate-y-2 transition-all duration-400 hover:shadow-xl ${card.glow} animate-fade-in-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-4`}>
              <Icon className={card.color} size={20} />
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">{card.title}</p>
            <h3 className={`text-2xl font-black ${card.color} break-words leading-tight`}>
              {values[card.key]}
            </h3>
          </div>
        );
      })}
    </div>
  );
}

export default AnalyticsCards;