import { CheckCircle2 } from "lucide-react";

function AIInsights({ aiInsights = [] }) {

  return (

    <div className="mt-14">

      <h2 className="text-4xl font-black mb-8">
        AI Insights
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        {aiInsights.map((item, index) => (

          <div
            key={index}
            className="bg-[#161616] border border-gray-800 rounded-3xl p-6 flex gap-4 items-start hover:border-orange-500 transition"
          >

            <CheckCircle2
              className="text-green-400 mt-1"
              size={22}
            />

            <p className="text-gray-300">
              {item}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default AIInsights;