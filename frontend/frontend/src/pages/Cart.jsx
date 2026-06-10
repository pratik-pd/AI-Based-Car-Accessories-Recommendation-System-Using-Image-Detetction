import { useEffect, useState } from "react";
import { Trash2, ShoppingCart, ArrowLeft, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const totalPrice = cart.reduce((total, item) => {
    const price = parseInt(String(item.price).replace("₹", "").replace(/,/g, "")) || 0;
    return total + price;
  }, 0);

  const handlePayment = async () => {
    try {
      console.log(totalPrice)
      const response = await axios.post(
        "http://127.0.0.1:5000/create-order",
        {
          amount: totalPrice
        }
      );
      console.log(response.data)
      const order = response.data;

      const options = {
        key: "rzp_test_SzoFHt38620ZOw",
        amount: order.amount,
        currency: order.currency,
        name: "AI VEHICLE DAMAGE ANALYZER",
        description: "Vehicle Accessories Purchase",
        order_id: order.id,

        handler: async function (paymentResponse) {
          try {
            const userId = localStorage.getItem("user_id");
            await axios.post("http://127.0.0.1:5000/verify-payment", {
              order_id: order.id,
              payment_id: paymentResponse.razorpay_payment_id,
              user_id: userId,
              amount: totalPrice,
              items: cart
            });
            alert("Payment Successful & Order Logged!");
            localStorage.removeItem("cart");
            setCart([]);
            window.dispatchEvent(new Event("storage"));
          } catch (err) {
            console.error("Order logging failed:", err);
            alert("Payment succeeded, but could not log order in backend.");
          }
        },

        theme: {
          color: "#f97316"
        }

      };
      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10 animate-fade-in-up">
          <div>
            <div className="inline-flex items-center gap-2 badge-orange mb-3">
              <ShoppingCart size={13} />
              <span>AI Recommended Accessories</span>
            </div>
            <h1 className="text-5xl font-black text-white">
              My <span className="gradient-text-orange">Cart</span>
            </h1>
          </div>
          <button
            onClick={() => navigate("/detect")}
            className="btn-glass flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Continue Scanning
          </button>
        </div>

        {/* EMPTY STATE */}
        {cart.length === 0 ? (
          <div className="glass rounded-[28px] p-16 text-center border border-white/7 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl glass-orange flex items-center justify-center mx-auto mb-6 animate-float">
              <ShoppingCart className="text-orange-400" size={36} />
            </div>
            <h2 className="text-3xl font-black text-white mb-3">Cart is Empty</h2>
            <p className="text-gray-400 mb-8">
              Run an AI vehicle scan to get personalized accessory recommendations.
            </p>
            <button
              onClick={() => navigate("/detect")}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Package size={18} />
              Start AI Scan
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">

            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="glass rounded-2xl p-5 border border-white/7 flex gap-5 items-center hover:border-orange-500/30 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  {/* IMAGE */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-white/8">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-base leading-snug line-clamp-2">{item.name}</h3>
                    <p className="text-orange-400 font-black text-xl mt-1">{item.price}</p>
                    {item.rating && (
                      <p className="text-yellow-400 text-xs mt-1">★ {item.rating}</p>
                    )}
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeItem(index)}
                    className="shrink-0 w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 flex items-center justify-center hover:bg-red-500/25 hover:scale-110 transition-all duration-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="lg:col-span-1">
              <div className="glass rounded-[24px] p-7 border border-orange-500/20 sticky top-28 animate-fade-in-up">
                <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                  <ShoppingCart size={20} className="text-orange-400" />
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>Items ({cart.length})</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="h-px bg-white/10 my-2" />
                  <div className="flex justify-between text-white font-black text-xl">
                    <span>Total</span>
                    <span className="gradient-text-orange">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <button className="w-full btn-primary flex items-center justify-center gap-2 py-4" onClick={handlePayment}>
                  <ShoppingCart size={18} />
                  Proceed to Checkout
                </button>

                <p className="text-gray-600 text-xs text-center mt-4">
                  🔒 Secure checkout · Free returns
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;