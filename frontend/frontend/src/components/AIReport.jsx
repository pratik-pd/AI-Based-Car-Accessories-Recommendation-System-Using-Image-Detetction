import { ShieldAlert, Wrench, AlertTriangle, CheckCircle } from "lucide-react";

const levelConfig = {
  Low:    { color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/25",  icon: <CheckCircle  size={18} className="text-green-400"  />, label: "Low Risk" },
  Medium: { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/25", icon: <AlertTriangle size={18} className="text-yellow-400" />, label: "Moderate Risk" },
  High:   { color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/25",    icon: <ShieldAlert   size={18} className="text-red-400"    />, label: "High Risk" },
};

function AIReport({ damageLevel, replacementNeeded }) {
  const level = levelConfig[damageLevel] || levelConfig.Low;
  const needsReplacement = replacementNeeded === "Yes";

  return (
    <div className="glass rounded-[24px] p-8 border border-white/7 animate-fade-in-up">

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
          <ShieldAlert className="text-orange-400" size={22} />
        </div>
        <div>
          <h2 className="text-xl font-black text-white">AI Inspection Report</h2>
          <p className="text-gray-500 text-xs">Damage assessment and service recommendations</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">

        {/* DAMAGE LEVEL */}
        <div className={`rounded-2xl p-6 border ${level.border} ${level.bg}`}>
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className={level.color} size={22} />
            <h3 className={`font-bold ${level.color}`}>Damage Level</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-5xl font-black ${level.color}`}>{damageLevel}</span>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${level.bg} border ${level.border}`}>
              {level.icon}
              <span className={`text-sm font-semibold ${level.color}`}>{level.label}</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">
            Based on detected damage type and severity score
          </p>
        </div>

        {/* REPLACEMENT STATUS */}
        <div className={`rounded-2xl p-6 border ${needsReplacement ? "border-red-500/25 bg-red-500/8" : "border-green-500/25 bg-green-500/8"}`}>
          <div className="flex items-center gap-2 mb-4">
            <Wrench className={needsReplacement ? "text-red-400" : "text-green-400"} size={22} />
            <h3 className={`font-bold ${needsReplacement ? "text-red-400" : "text-green-400"}`}>
              Service Recommendation
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-3xl font-black ${needsReplacement ? "text-red-400" : "text-green-400"}`}>
              {needsReplacement ? "Replacement Required" : "Repair Possible"}
            </span>
          </div>
          <div className={`mt-4 flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-xl w-fit ${
            needsReplacement ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"
          }`}>
            {needsReplacement ? <AlertTriangle size={14} /> : <CheckCircle size={14} />}
            Replacement Needed: {replacementNeeded}
          </div>
          <p className="text-gray-500 text-xs mt-4">
            AI recommends professional inspection before final decision
          </p>
        </div>

      </div>

    </div>
  );
}

export default AIReport;