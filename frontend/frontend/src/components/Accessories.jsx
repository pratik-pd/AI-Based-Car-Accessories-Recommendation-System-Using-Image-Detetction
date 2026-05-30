function Accessories({ recommendations }) {

  if (!recommendations || recommendations.length === 0) {

    return null;
  }

  return (

    <div className="mt-20">

      <h1 className="text-4xl font-black text-white mb-10">
        Recommended Accessories
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {recommendations.map((item, index) => (

          <div
            key={index}
            className="bg-[#161616] border border-gray-800 rounded-[30px] overflow-hidden"
          >

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-6">

              <h2 className="text-white text-2xl font-bold">
                {item.name}
              </h2>

              <p className="text-orange-500 text-2xl font-black mt-4">
                {item.price}
              </p>

              <p className="text-yellow-400 mt-2">
                ⭐ {item.rating}
              </p>

              <button
                onClick={() => window.open(item.link)}
                className="w-full mt-6 bg-orange-500 py-3 rounded-2xl font-bold"
              >
                Buy Now
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Accessories;

