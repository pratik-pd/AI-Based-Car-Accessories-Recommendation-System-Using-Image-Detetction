import { Cpu, Car, Shield } from "lucide-react";

function ResultCard({ prediction, confidence }) {

  return (

    <div className="mt-12 bg-[#161616] rounded-[30px] p-8">

      <div className="flex items-center gap-3">

        <Cpu className="text-green-400" />

        <h2 className="text-3xl font-black text-white">
          AI Detection Result
        </h2>

      </div>

      <div className="mt-6 flex items-center gap-3">

        <Car className="text-orange-500" />

        <span className="text-white text-2xl font-bold">
          {prediction}
        </span>

      </div>

      <div className="mt-8">

        <div className="flex justify-between mb-3">

          <div className="flex items-center gap-2">

            <Shield className="text-blue-400" />

            <span className="text-gray-300">
              AI Confidence
            </span>

          </div>

          <span className="text-blue-400 font-bold">
            {confidence}
          </span>

        </div>

        <div className="w-full bg-gray-800 h-4 rounded-full overflow-hidden">

          <div
            className="bg-gradient-to-r from-orange-500 to-blue-500 h-4"
            style={{
              width: confidence,
            }}
          ></div>

        </div>

      </div>

    </div>
  );
}

export default ResultCard;