function AnalyticsCards({

  brand,
  repairCost,
  vehicleHealth,
  confidence,

}) {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

      {/* CONFIDENCE */}

      <div className="bg-[#161616] p-6 rounded-[25px] border border-gray-800">

        <p className="text-gray-400">
          AI Confidence
        </p>

        <h2 className="text-3xl font-black text-orange-500 mt-4">
          {confidence}
        </h2>

      </div>

      {/* BRAND */}

      <div className="bg-[#161616] p-6 rounded-[25px] border border-gray-800">

        <p className="text-gray-400">
          Vehicle Brand
        </p>

        <h2 className="text-3xl font-black text-red-400 mt-4">
          {brand}
        </h2>

      </div>

      {/* REPAIR COST */}

      <div className="bg-[#161616] p-6 rounded-[25px] border border-gray-800">

        <p className="text-gray-400">
          Repair Cost
        </p>

        <h2 className="text-3xl font-black text-green-400 mt-4">
          {repairCost}
        </h2>

      </div>

      {/* HEALTH */}

      <div className="bg-[#161616] p-6 rounded-[25px] border border-gray-800">

        <p className="text-gray-400">
          Vehicle Health
        </p>

        <h2 className="text-3xl font-black text-cyan-400 mt-4">
          {vehicleHealth}
        </h2>

      </div>

    </div>
  );
}

export default AnalyticsCards;

