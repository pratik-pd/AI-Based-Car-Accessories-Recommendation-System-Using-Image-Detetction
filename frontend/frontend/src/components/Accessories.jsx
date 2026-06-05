import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

function Accessories({ recommendations }) {

  const navigate = useNavigate();

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (

    <div className="mt-20">

      <h1 className="text-5xl font-black text-center text-white mb-12">
        Recommended Accessories
      </h1>

      <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
        AI selected these accessories based on your vehicle analysis
        and driving requirements.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {recommendations.map((item, index) => (

          <div
            key={index}
            className="
              bg-[#161616]
              border
              border-gray-800
              rounded-[30px]
              overflow-hidden
              hover:border-orange-500
              hover:-translate-y-3
              transition-all
              duration-500
              shadow-lg
            "
          >

            {/* IMAGE */}

            <div className="overflow-hidden">

              <img
                src={item.image}
                alt={item.name}
                className="
                  w-full
                  h-56
                  object-cover
                  hover:scale-110
                  transition
                  duration-700
                "
              />

            </div>

            {/* CONTENT */}

            <div className="p-6">

              <h2 className="text-white text-2xl font-bold min-h-[60px]">
                {item.name}
              </h2>

              <p className="text-orange-500 text-3xl font-black mt-4">
                {item.price}
              </p>

              <div className="flex items-center gap-2 mt-3">

                <Star
                  size={18}
                  className="text-yellow-400 fill-yellow-400"
                />

                <span className="text-yellow-400 font-semibold">
                  {item.rating || "4.5"}
                </span>

              </div>

              {item.description && (

                <p className="text-gray-400 mt-4 text-sm line-clamp-3">
                  {item.description}
                </p>

              )}

              <button
                onClick={() =>
                  navigate("/product", {
                    state: item,
                  })
                }
                className="
                  w-full
                  mt-6
                  bg-orange-500
                  hover:bg-orange-600
                  py-3
                  rounded-2xl
                  font-bold
                  text-white
                  transition-all
                  duration-300
                "
              >
                View Details
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Accessories;