import { useLocation, useNavigate } from "react-router-dom";

function ProductDetails() {

  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state;

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-black">
          Product Not Found
        </h1>

        <button
          onClick={() => navigate("/home")}
          className="mt-6 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-2xl font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  const addToCart = () => {

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyExists = existingCart.find(
      (item) => item.name === product.name
    );

    if (alreadyExists) {
      alert("Product already added to cart");
      return;
    }

    existingCart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert("Added To Cart Successfully");
  };

  return (

    <div className="min-h-screen bg-black text-white p-6 md:p-10">

      <div className="max-w-7xl mx-auto">

        <button
          onClick={() => navigate("/home")}
          className="mb-8 bg-[#1a1a1a] hover:bg-[#222] px-5 py-3 rounded-xl"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}

          <div>

            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-3xl object-cover border border-gray-800"
            />

          </div>

          {/* DETAILS */}

          <div>

            <span className="bg-orange-500/20 text-orange-500 px-4 py-2 rounded-full text-sm">
              AI Recommended Product
            </span>

            <h1 className="text-4xl md:text-5xl font-black mt-5">
              {product.name}
            </h1>

            <p className="text-orange-500 text-4xl font-black mt-6">
              {product.price}
            </p>

            <p className="text-yellow-400 text-lg mt-3">
              ⭐ {product.rating || "4.8"}
            </p>

            <div className="mt-8 space-y-4 text-gray-300">

              <p>✅ 1 Year Warranty</p>

              <p>✅ Genuine Product Guarantee</p>

              <p>✅ Free Delivery Across India</p>

              <p>✅ Easy Return Policy</p>

              <p>✅ Quality Tested Product</p>

            </div>

            <div className="mt-10 bg-[#161616] border border-gray-800 rounded-3xl p-6">

              <h3 className="text-2xl font-bold mb-4">
                Product Description
              </h3>

              <p className="text-gray-400 leading-relaxed">

                {product.description ||
                  "Premium quality vehicle accessory recommended by our AI analysis engine. Designed to improve comfort, safety and driving experience."}

              </p>

            </div>

            <button
              onClick={addToCart}
              className="mt-10 bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-8 py-4 rounded-2xl font-bold text-lg"
            >
              Add To Cart
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;