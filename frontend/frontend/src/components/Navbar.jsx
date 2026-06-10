import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, LayoutDashboard, LogOut, Car, Scan } from "lucide-react";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const updateCart = () => {
      const data = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(data);
    };
    updateCart();
    window.addEventListener("storage", updateCart);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("storage", updateCart);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoutUser = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "glass-dark border-b border-white/8 shadow-2xl"
          : "bg-gradient-to-b from-black/60 to-transparent"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">

        {/* BRAND */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/home")}
        >
          <div className="w-10 h-10 rounded-xl glass-orange flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Car className="text-orange-400" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black text-white leading-none">
              AI Vehicle
              <span className="gradient-text-orange ml-1">Analyzer</span>
            </h1>
            <p className="text-[10px] text-gray-500 leading-none mt-0.5">Yolo8s.pt Powered</p>
          </div>
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={() => navigate("/detect")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive("/detect")
                ? "bg-orange-500/15 text-orange-400 border border-orange-500/30"
                : "text-gray-400 hover:text-white hover:bg-white/6"
              }`}
          >
            <Scan size={16} />
            Scan Vehicle
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive("/dashboard")
                ? "bg-orange-500/15 text-orange-400 border border-orange-500/30"
                : "text-gray-400 hover:text-white hover:bg-white/6"
              }`}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </button>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">

          {/* CART */}
          <button
            id="nav-cart-btn"
            onClick={() => navigate("/cart")}
            className="relative p-2.5 rounded-xl glass hover:border-orange-500/40 transition-all duration-300 group"
          >
            <ShoppingCart size={20} className="text-gray-400 group-hover:text-orange-400 transition" />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-pulse-glow">
                {cart.length}
              </span>
            )}
          </button>

          {/* LOGOUT */}
          <button
            id="nav-logout-btn"
            onClick={logoutUser}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm font-semibold hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300"
          >
            <LogOut size={16} />
            <span className="hidden sm:block">Logout</span>
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;