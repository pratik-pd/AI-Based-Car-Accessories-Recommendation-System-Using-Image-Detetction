import {
  ShieldAlert,
  Wrench,
} from "lucide-react";

function AIReport({
  damageLevel,
  replacementNeeded,
}) {

  return (

    <div className="mt-16">

      <h2 className="text-4xl font-black mb-8">
        AI Inspection Report
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-[#161616] rounded-3xl p-8 border border-red-500/20">

          <ShieldAlert
            className="text-red-400 mb-4"
            size={35}
          />

          <h3 className="text-2xl font-bold text-red-400">
            Damage Detection
          </h3>

          <p className="text-gray-400 mt-4">
            AI inspected visible vehicle surfaces.
          </p>

          <div className="mt-6 bg-[#222] rounded-2xl p-4">

            <span className="text-white font-bold">
              Damage Level:
            </span>

            <span className="text-yellow-400 ml-2">
              {damageLevel}
            </span>

          </div>

        </div>

        <div className="bg-[#161616] rounded-3xl p-8 border border-green-500/20">

          <Wrench
            className="text-green-400 mb-4"
            size={35}
          />

          <h3 className="text-2xl font-bold text-green-400">
            Service Recommendation
          </h3>

          <p className="text-gray-400 mt-4">
            AI generated maintenance advice.
          </p>

          <div className="mt-6 bg-[#222] rounded-2xl p-4">

            <span className="text-white font-bold">
              Replacement Needed:
            </span>

            <span className="text-green-400 ml-2">
              {replacementNeeded}
            </span>

          </div>

        </div>

      </div>

    </div>

  );
}

export default AIReport;