import { Cpu, Car, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";

const severityConfig = {
  Low:    { color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30", glow: "shadow-green-500/20", dot: "bg-green-400" },
  Medium: { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", glow: "shadow-yellow-500/20", dot: "bg-yellow-400" },
  High:   { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", glow: "shadow-red-500/20", dot: "bg-red-400" },
};

function ResultCard({ prediction, confidence, allDetections = [] }) {
  const sev = severityConfig[allDetections[0]?.severity] || severityConfig.Low;

  return (
    <div className="glass rounded-[24px] p-8 border border-white/7 shadow-2xl animate-fade-in-up">

      {/* HEADER */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
            <Cpu className="text-green-400" size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">AI Detection Result</h2>
            <p className="text-gray-500 text-xs">YOLOv8 Neural Network Analysis</p>
          </div>
        </div>
        <div className="badge-green flex items-center gap-2">
          <CheckCircle size={14} />
          Detection Successful
        </div>
      </div>

      {/* PRIMARY DETECTION */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 glass rounded-2xl p-6 border border-white/6">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
            <Car size={12} />
            Primary Damage Detected
          </p>
          <h3 className="text-4xl font-black text-white capitalize">
            {prediction.replace("_", " ")}
          </h3>
          <p className="text-gray-400 text-sm mt-2">Highest confidence detection</p>
        </div>

        <div className="flex-1 glass rounded-2xl p-6 border border-white/6">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
            <TrendingUp size={12} />
            AI Confidence Score
          </p>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-black text-white">{confidence}%</span>
            <span className="text-gray-500 text-sm mb-1">accuracy</span>
          </div>
          {/* ANIMATED BAR */}
          <div className="w-full bg-gray-800/80 h-3 rounded-full overflow-hidden">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-orange-500 via-yellow-400 to-green-400 transition-all duration-1500 ease-out"
              style={{ width: `${confidence}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* ALL DETECTIONS */}
      {allDetections.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle className="text-red-400" size={20} />
            <h3 className="text-lg font-bold text-white">All Detected Damages</h3>
            <span className="badge-red text-[10px]">{allDetections.length} found</span>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {allDetections.map((damage, index) => (
              <div
                key={index}
                className="glass rounded-xl p-4 border border-red-500/15 hover:border-red-500/40 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-red-400 font-bold capitalize mb-1">
                  {damage.damage_type.replace(/_/g, " ")}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-400 rounded-full"
                      style={{ width: `${damage.confidence}%` }}
                    />
                  </div>
                  <span className="text-white text-sm font-semibold w-12 text-right">
                    {damage.confidence}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default ResultCard;