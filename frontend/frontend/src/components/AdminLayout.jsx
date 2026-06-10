import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Shield, LayoutDashboard, Settings, ShoppingBag, Users, Image as ImageIcon, ArrowLeft, LogOut } from "lucide-react";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check auth and admin role
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = userData?.user?.role === "admin";

  if (!token || !isAdmin) {
    // Redirect non-admins to the home page or login
    return <Navigate to="/home" replace />;
  }

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Accessories", path: "/admin/accessories", icon: Settings },
    { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Scans Feed", path: "/admin/scans", icon: ImageIcon }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-black/40 border-r border-white/8 p-6 flex flex-col fixed h-screen z-20 backdrop-blur-md">
        
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => navigate("/home")}>
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
            <Shield className="text-orange-400" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-black text-white leading-none">Admin Console</h1>
            <p className="text-[10px] text-gray-500 leading-none mt-1">Vehicle AI Hub</p>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/6"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER ACTIONS */}
        <div className="pt-6 border-t border-white/8 space-y-2">
          <button
            onClick={() => navigate("/home")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/6 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Back to App
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 pl-64 min-h-screen">
        <div className="p-8 max-w-7xl mx-auto pt-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
