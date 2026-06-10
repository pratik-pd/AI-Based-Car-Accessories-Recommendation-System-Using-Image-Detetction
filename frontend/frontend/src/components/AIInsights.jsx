import { Lightbulb, CheckCircle2 } from "lucide-react";

function AIInsights({ aiInsights = [] }) {
  return (
    <div className="glass rounded-[24px] p-8 border border-purple-500/15 animate-fade-in-up">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
          <Lightbulb className="text-purple-400" size={22} />
        </div>
        <div>
          <h2 className="text-xl font-black text-white">AI Insights</h2>
          <p className="text-gray-500 text-xs">{aiInsights.length} recommendations generated</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {aiInsights.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-xl bg-white/3 border border-white/6 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.07}s` }}
          >
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mt-0.5">
              <CheckCircle2 className="text-green-400" size={14} />
            </div>
            <div>
              <span className="text-xs text-gray-600 uppercase tracking-widest">#{index + 1}</span>
              <p className="text-gray-300 text-sm leading-relaxed mt-0.5">{item}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default AIInsights;