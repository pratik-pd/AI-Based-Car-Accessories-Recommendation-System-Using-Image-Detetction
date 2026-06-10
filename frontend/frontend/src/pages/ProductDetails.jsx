import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, CheckCircle, Sparkles, Shield, Truck, RotateCcw, Award } from "lucide-react";
import Navbar from "../components/Navbar";

const perks = [
  { icon: Shield, text: "1 Year Warranty" },
  { icon: Award, text: "Genuine Product Guarantee" },
  { icon: Truck, text: "Free Delivery Across India" },
  { icon: RotateCcw, text: "Easy 30-Day Return Policy" },
  { icon: CheckCircle, text: "Quality Tested & Certified" },
];

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col justify-center items-center text-white">
        <div className="w-16 h-16 rounded-2xl glass-orange flex items-center justify-center mb-6 animate-float">
          <ShoppingCart className="text-orange-400" size={28} />
        </div>
        <h1 className="text-4xl font-black text-white mb-3">Product Not Found</h1>
        <p className="text-gray-400 mb-8">This product no longer exists or was not loaded correctly.</p>
        <button onClick={() => navigate(-1)} className="btn-primary flex items-center gap-2">
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    );
  }

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const alreadyExists = existingCart.find((item) => item.name === product.name);
    if (alreadyExists) {
      alert("This product is already in your cart.");
      return;
    }
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("storage"));
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-all duration-300 group animate-fade-in"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to results
        </button>

        <div className="grid md:grid-cols-2 gap-12 items-start animate-fade-in-up">

          {/* IMAGE COLUMN */}
          <div className="sticky top-28">
            <div className="relative rounded-[28px] overflow-hidden border border-white/8 shadow-2xl group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* AI BADGE */}
              <div className="absolute top-4 left-4 badge-orange flex items-center gap-1.5">
                <Sparkles size={12} />
                AI Recommended
              </div>
            </div>
          </div>

          {/* DETAILS COLUMN */}
          <div>
            {/* PRODUCT NAME */}
            <h1 className="text-4xl font-black text-white leading-tight mb-4">
              {product.name}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.round(product.rating || 4.5) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
                  />
                ))}
              </div>
              <span className="text-yellow-400 font-bold">{product.rating || "4.5"}</span>
              <span className="text-gray-500 text-sm">/ 5.0</span>
            </div>

            {/* PRICE */}
            <div className="glass rounded-2xl p-5 border border-orange-500/20 mb-8">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Price</p>
              <p className="text-5xl font-black gradient-text-orange">{product.price}</p>
              <p className="text-gray-500 text-xs mt-2">Inclusive of all taxes · Free shipping</p>
            </div>

            {/* PERKS */}
            <div className="space-y-3 mb-8">
              {perks.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-7 h-7 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                      <Icon size={13} className="text-green-400" />
                    </div>
                    {perk.text}
                  </div>
                );
              })}
            </div>

            {/* DESCRIPTION */}
            <div className="glass rounded-[20px] p-6 border border-white/7 mb-8">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Shield size={16} className="text-orange-400" />
                Product Description
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {product.description || "Premium quality vehicle accessory recommended by our AI analysis engine. Designed to improve comfort, safety, and driving experience."}
              </p>
            </div>

            {/* ADD TO CART BUTTON */}
            <button
              id="add-to-cart-btn"
              onClick={addToCart}
              className="w-full btn-primary flex items-center justify-center gap-3 py-5 text-lg"
            >
              <ShoppingCart size={22} />
              Add To Cart
            </button>

            <p className="text-gray-600 text-xs text-center mt-4">
              🔒 Secure checkout · 30-day money back guarantee
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;