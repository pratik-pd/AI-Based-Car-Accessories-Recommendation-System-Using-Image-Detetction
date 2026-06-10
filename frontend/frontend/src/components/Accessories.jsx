import { useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Sparkles } from "lucide-react";

function Accessories({ recommendations }) {
  const navigate = useNavigate();

  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="mt-8 animate-fade-in-up">

      {/* SECTION HEADER */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 badge-orange mb-4">
          <Sparkles size={13} />
          <span>AI Recommendations</span>
        </div>
        <h2 className="text-4xl font-black text-white">
          Recommended{" "}
          <span className="gradient-text-orange">Accessories</span>
        </h2>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-sm">
          These accessories were selected by AI based on your vehicle's damage type and inspection results.
        </p>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((item, index) => (
          <div
            key={index}
            className="group card-premium border border-white/6 overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden h-52">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* RATING BADGE */}
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-xl border border-yellow-500/30">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 text-xs font-bold">{item.rating || "4.5"}</span>
              </div>

              {/* PRICE BADGE */}
              <div className="absolute bottom-3 left-3 bg-orange-500 px-3 py-1 rounded-xl">
                <span className="text-white font-black text-sm">{item.price}</span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <h3 className="text-white font-bold text-lg leading-snug min-h-[50px] line-clamp-2">
                {item.name}
              </h3>

              {item.description && (
                <p className="text-gray-500 text-sm mt-3 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              )}

              {/* BUTTON */}
              <button
                id={`accessory-btn-${index}`}
                onClick={() => navigate("/product", { state: item })}
                className="w-full mt-5 btn-primary flex items-center justify-center gap-2 py-3 text-sm"
              >
                <ShoppingCart size={16} />
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