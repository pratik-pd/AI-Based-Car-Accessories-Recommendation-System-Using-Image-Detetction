import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Navbar() {

  const navigate = useNavigate();

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const logoutUser = () => {

    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    localStorage.clear();

    navigate("/");
  };

  return (

    <div className="fixed top-0 left-0 right-0 z-50  bg-[#111111]/70 backdrop-blur-md">

      <div className="max-w-[1400px] mx-auto px-6 py-5 flex justify-between items-center">

        <h1 className="text-3xl font-black text-white">

          AI Vehicle

          <span className="text-orange-500">
            {" "}Analyzer
          </span>

        </h1>

        <div className="flex items-center gap-4">

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >

            <ShoppingCart
              size={30}
              className="text-white hover:text-orange-500 transition"
            />

            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 rounded-full">
              {cart.length}
            </span>

          </div>

          <button onClick={() => navigate("/dashboard")} className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-6 py-3 rounded-2xl font-bold text-white" >
            Dashboard
          </button>

          <button
            onClick={logoutUser}
            className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-6 py-3 rounded-2xl font-bold text-white"
          >

            Logout

          </button>

        </div>

      </div>

    </div>

  );
}

export default Navbar;