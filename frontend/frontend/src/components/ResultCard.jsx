import {
  Cpu,
  Car,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

function ResultCard({
  prediction,
  confidence,
  allDetections = [],
}) {
  return (
    <div className="mt-12 bg-gradient-to-br from-[#181818] to-[#101010] border border-gray-800 rounded-[30px] p-8 shadow-2xl">

      {/* TITLE */}
      <div className="flex items-center gap-3">
        <Cpu
          className="text-green-400"
          size={30}
        />

        <h2 className="text-3xl font-black text-white">
          AI Detection Result
        </h2>
      </div>

      {/* MAIN DETECTION */}
      <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div>
          <p className="text-gray-400 mb-2">
            Primary Damage Detected
          </p>

          <div className="flex items-center gap-3">
            <Car
              className="text-orange-500"
              size={30}
            />

            <span className="text-4xl font-black text-white capitalize">
              {prediction}
            </span>
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500 px-4 py-2 rounded-full">
          <div className="flex items-center gap-2">
            <CheckCircle
              size={18}
              className="text-green-400"
            />

            <span className="text-green-400 font-semibold">
              Detection Successful
            </span>
          </div>
        </div>
      </div>

      {/* CONFIDENCE */}
      <div className="mt-10">

        <div className="flex justify-between mb-3">

          <div className="flex items-center gap-2">
            <ShieldCheck
              className="text-blue-400"
              size={22}
            />

            <span className="text-gray-300 font-medium">
              AI Confidence Score
            </span>
          </div>

          <span className="text-blue-400 font-black text-xl">
            {confidence}%
          </span>

        </div>

        <div className="w-full bg-gray-800 h-5 rounded-full overflow-hidden">

          <div
            className="
              bg-gradient-to-r
              from-orange-500
              via-yellow-400
              to-green-500
              h-5
              transition-all
              duration-1000
            "
            style={{
              width: `${confidence}%`,
            }}
          ></div>

        </div>

      </div>

      {/* ALL DAMAGES */}
      {allDetections.length > 0 && (
        <div className="mt-10">

          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle
              className="text-red-400"
              size={24}
            />

            <h3 className="text-2xl font-bold text-white">
              All Detected Damages
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">

            {allDetections.map((damage, index) => (
              <div
                key={index}
                className="
                  bg-red-500/10
                  border
                  border-red-500/20
                  rounded-2xl
                  p-4
                "
              >
                <p className="text-red-400 font-bold text-lg capitalize">
                  {damage.damage_type.replace("_", " ")}
                </p>

                <p className="text-gray-300 mt-2">
                  Confidence:
                </p>

                <p className="text-white font-semibold">
                  {damage.confidence}%
                </p>
              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
}

export default ResultCard;