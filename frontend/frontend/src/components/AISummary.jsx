import { Cpu } from "lucide-react";

function AISummary({ aiSummary }) {

  return (

    <div className="mt-14 bg-[#161616] rounded-[30px] p-8">

      <div className="flex items-center gap-3 mb-5">

        <Cpu className="text-cyan-400" />

        <h2 className="text-3xl font-black text-white">
          AI Vehicle Summary
        </h2>

      </div>

      <p className="text-gray-400 text-lg leading-relaxed">
        {aiSummary}
      </p>

    </div>
  );
}

export default AISummary;