function Stats() {

  const stats = [

    {
      number: "10K+",
      label: "Vehicle Scans"
    },

    {
      number: "98%",
      label: "Detection Accuracy"
    },

    {
      number: "5K+",
      label: "Users"
    },

    {
      number: "24/7",
      label: "AI Monitoring"
    }

  ];

  return (

    <section className="py-24 bg-[#0b0b0b]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-[#141414] rounded-3xl border border-gray-800 p-10 text-center hover:border-orange-500 transition duration-500"
            >

              <h1 className="text-5xl font-black bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">
                {item.number}
              </h1>

              <p className="text-gray-400 mt-4">
                {item.label}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Stats;