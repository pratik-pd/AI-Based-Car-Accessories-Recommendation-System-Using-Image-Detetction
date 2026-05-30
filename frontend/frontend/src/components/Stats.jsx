function Stats() {

  const stats = [

    {
      number: "10K+",
      label: "Vehicle Scans"
    },

    {
      number: "98%",
      label: "AI Accuracy"
    },

    {
      number: "5K+",
      label: "Happy Users"
    },

    {
      number: "24/7",
      label: "AI Monitoring"
    }

  ];

  return (

    <div className="bg-[#0f0f0f] py-20 px-6">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">

        {stats.map((item, index) => (

          <div
            key={index}
            className="bg-[#181818] border border-gray-800 rounded-3xl p-8 text-center"
          >

            <h1 className="text-4xl font-black text-orange-500">
              {item.number}
            </h1>

            <p className="text-gray-400 mt-3">
              {item.label}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Stats;

