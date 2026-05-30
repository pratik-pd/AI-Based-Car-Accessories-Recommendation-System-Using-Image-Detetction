function Testimonials() {

  const reviews = [

    {
      name: "Rahul Sharma",
      review:
        "Amazing AI analyzer. The vehicle detection is super accurate.",
    },

    {
      name: "Priya Patel",
      review:
        "The damage detection and AI report look futuristic.",
    },

    {
      name: "Aman Verma",
      review:
        "Best MCA AI project idea with premium UI.",
    },

  ];

  return (

    <div className="py-24 px-6 bg-black">

      <h2 className="text-4xl font-black text-center text-white">
        What Users Say
      </h2>

      <p className="text-gray-400 text-center mt-4">
        Trusted by vehicle enthusiasts and AI lovers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

        {reviews.map((item, index) => (

          <div
            key={index}
            className="bg-[#161616] border border-gray-800 rounded-[30px] p-8 hover:border-orange-500 transition-all duration-300"
          >

            <div className="text-yellow-400 text-2xl">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="text-gray-300 mt-6 leading-relaxed">
              {item.review}
            </p>

            <h3 className="text-white font-bold mt-8 text-xl">
              {item.name}
            </h3>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Testimonials;

