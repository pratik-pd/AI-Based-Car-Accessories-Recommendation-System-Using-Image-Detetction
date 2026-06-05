import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

function Cart() {

  const [cart, setCart] = useState([]);

  useEffect(() => {

    const data =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(data);

  }, []);

  const removeItem = (index) => {

    const updatedCart = cart.filter(
      (_, i) => i !== index
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const totalPrice = cart.reduce((total, item) => {

    const price = parseInt(
      String(item.price)
        .replace("₹", "")
        .replace(",", "")
    ) || 0;

    return total + price;

  }, 0);

  return (

    <div className="min-h-screen bg-black text-white p-6 md:p-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black mb-10">
          My Cart
        </h1>

        {cart.length === 0 ? (

          <div className="bg-[#161616] border border-gray-800 rounded-3xl p-10 text-center">

            <h2 className="text-3xl font-bold">
              🛒 Cart is Empty
            </h2>

            <p className="text-gray-400 mt-3">
              Add some accessories recommended by AI.
            </p>

          </div>

        ) : (

          <>
            {cart.map((item, index) => (

              <div
                key={index}
                className="bg-[#161616] border border-gray-800 p-5 rounded-3xl mb-5 flex flex-col md:flex-row gap-5 items-center"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-2xl"
                />

                <div className="flex-1">

                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-orange-500 text-xl mt-2">
                    {item.price}
                  </p>

                </div>

                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-xl flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Remove
                </button>

              </div>

            ))}

            {/* TOTAL */}

            <div className="bg-[#161616] border border-gray-800 rounded-3xl p-8 mt-10">

              <h2 className="text-3xl font-black">
                Total Amount
              </h2>

              <p className="text-4xl text-orange-500 font-black mt-4">
                ₹{totalPrice.toLocaleString()}
              </p>

              <button
                className="mt-6 bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-8 py-4 rounded-2xl font-bold"
              >
                Proceed To Checkout
              </button>

            </div>

          </>
        )}

      </div>

    </div>
  );
}

export default Cart;