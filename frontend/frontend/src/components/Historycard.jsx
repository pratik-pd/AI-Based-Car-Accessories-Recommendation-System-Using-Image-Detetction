function HistoryCard({ report }) {

  return (

    <div className="bg-[#181818] p-6 rounded-3xl">

      <img
        src={report.prediction_image}
        alt=""
        className="
        w-full
        h-60
        object-cover
        rounded-2xl
        "
      />

      <h2 className="text-3xl font-black mt-4 capitalize">

        {report.prediction}

      </h2>

      <p className="text-gray-400">

        Confidence:
        {report.confidence}%

      </p>

      <p className="text-yellow-400">

        Damage:
        {report.damage_level}

      </p>

      <p className="text-green-400">

        Repair:
        {report.repair_cost}

      </p>

    </div>
  );
}

export default HistoryCard;