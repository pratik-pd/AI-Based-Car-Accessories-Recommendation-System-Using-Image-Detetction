import AIInsights from "./AIInsights";
import AISummary from "./AISummary";
function AIReport({
  damageLevel,
  replacementNeeded,
}) {
  return (
    <div className="mt-14">
      <h2 className="text-3xl font-black text-white mb-8">
        Advanced AI Scan Report
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* DAMAGE */}
        <div className="bg-[#181818] p-7 rounded-[30px] border border-red-500/20">
          <h3 className="text-2xl font-bold text-red-400">
            Damage Detection
          </h3>

          <p className="text-gray-400 mt-4">
            AI searched for dents, scratches and collision damage.
          </p>

          <div className="mt-6 bg-[#222] p-4 rounded-2xl">
            <p className="text-yellow-400 font-bold">
              Damage Level: {damageLevel}
            </p>
          </div>
        </div>

        {/* REPLACEMENT */}
        <div className="bg-[#181818] p-7 rounded-[30px] border border-green-500/20">
          <h3 className="text-2xl font-bold text-green-400">
            Replacement Suggestion
          </h3>

          <p className="text-gray-400 mt-4">
            AI generated servicing recommendation.
          </p>

          <div className="mt-6 bg-[#222] p-4 rounded-2xl">
            <p className="text-green-400 font-bold">
              Replacement Needed: {replacementNeeded}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AIReport;