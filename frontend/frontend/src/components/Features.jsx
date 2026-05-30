function Features() {

  const features = [

    {
      title: "AI Vehicle Detection",
      desc: "Detect cars, bikes, buses and trucks using AI."
    },

    {
      title: "Damage Analysis",
      desc: "AI checks scratches, dents and body damage."
    },

    {
      title: "Smart Recommendations",
      desc: "Get accessories and maintenance suggestions."
    },

    {
      title: "Fast Processing",
      desc: "Get vehicle reports within seconds."
    }

  ];

  return (

    <div className="w-full px-6 py-20 bg-black">

      <h1 className="text-4xl font-black text-white text-center">
        Features
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">

        {features.map((item, index) => (

          <div
            key={index}
            className="bg-[#161616] border border-gray-800 rounded-3xl p-6 hover:border-orange-500 transition-all duration-300"
          >

            <h2 className="text-2xl font-bold text-orange-500">
              {item.title}
            </h2>

            <p className="text-gray-400 mt-4 leading-relaxed">
              {item.desc}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Features;

