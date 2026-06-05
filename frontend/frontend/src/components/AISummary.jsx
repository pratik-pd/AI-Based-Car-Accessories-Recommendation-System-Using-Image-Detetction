import { Cpu } from "lucide-react";

function AISummary({ aiSummary }) {

  return (

  <div className="mt-14 bg-gradient-to-br from-[#151515] to-[#0f0f0f] border border-gray-800 rounded-3xl p-8">

    <div className="flex items-center gap-3 mb-5">

      <Cpu
        className="text-cyan-400"
        size={30}
      />

      <h2 className="text-3xl font-black">
        AI Vehicle Summary
      </h2>

    </div>

    <p className="text-gray-300 text-lg leading-loose whitespace-pre-line">
      {aiSummary}
    </p>

  </div>

);
}

export default AISummary;