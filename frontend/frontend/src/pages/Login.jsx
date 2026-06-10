import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Car, Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginUser = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const response = await axios.post("http://127.0.0.1:5000/login", { email, password });
      if (!response.data.success) {
        setError(response.data.message);
        setLoading(false);
        return;
      }
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("user_id", response.data.token);
      navigate("/home");
    } catch (err) {
      setError("Login Failed. Please try again.");
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") loginUser();
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 relative overflow-hidden">

      {/* ANIMATED BACKGROUND ORBS */}
      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] rounded-full bg-orange-600/8 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-900/5 blur-[140px]" />

      {/* CARD */}
      <div className="relative z-10 w-full max-w-[440px] animate-fade-in-up">

        {/* BRAND */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass-orange mb-4 animate-float">
            <Car className="text-orange-400" size={30} />
          </div>
          <h1 className="text-3xl font-black text-white">AI Vehicle Analyzer</h1>
          <p className="text-gray-500 text-sm mt-1">Powered by YOLOv8 Intelligence</p>
        </div>

        {/* FORM CARD */}
        <div className="glass rounded-[28px] p-8 border border-white/8 shadow-2xl">

          <h2 className="text-2xl font-black text-white mb-1">Welcome Back</h2>
          <p className="text-gray-400 text-sm mb-8">Sign in to continue your inspection</p>

          {/* ERROR */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm animate-fade-in flex items-center gap-2">
              <span className="text-red-500">⚠</span> {error}
            </div>
          )}

          {/* EMAIL */}
          <div className="relative mb-4">
            <Mail className="absolute left-0.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              id="login-email"
              type="email"
              placeholder="Email address"
              className="input-premium pl-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative mb-6">
            <Lock className="absolute left-0.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-premium pl-11 pr-11"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-400 transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            id="login-btn"
            onClick={loginUser}
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-3 text-base"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-600 text-xs">New here?</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* SIGNUP LINK */}
          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-400 font-bold hover:text-orange-300 transition">
              Create Account →
            </Link>
          </p>

        </div>

        {/* FOOTER NOTE */}
        <p className="text-center text-gray-600 text-xs mt-6">
          © 2026 AI Vehicle Damage Analyzer · MCA Major Project
        </p>
      </div>

    </div>
  );
}

export default Login;