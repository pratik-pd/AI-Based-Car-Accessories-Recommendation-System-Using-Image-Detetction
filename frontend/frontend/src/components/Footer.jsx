import { Car, Mail, Phone, GitBranch, ExternalLink, Scan, LayoutDashboard, Shield } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden">

      {/* TOP GRADIENT BORDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

      {/* BG */}
      <div className="bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="grid md:grid-cols-4 gap-10">

            {/* BRAND COL */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl glass-orange flex items-center justify-center">
                  <Car className="text-orange-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">AI Vehicle Damage Analyzer</h2>
                  <p className="text-xs text-gray-500">YOLO8s · Flask · React</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                An AI-powered vehicle inspection platform that detects damage, assesses vehicle health, estimates repair costs, and recommends accessories — all within seconds.
              </p>
              <div className="flex items-center gap-2 mt-5">
                <span className="badge-orange text-xs">MCA Major Project</span>
                <span className="badge-green text-xs">2026</span>
              </div>
            </div>

            {/* FEATURES COL */}
            <div>
              <h3 className="text-white font-bold mb-5 flex items-center gap-2">
                <Shield size={16} className="text-orange-400" />
                Features
              </h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                {[
                  { icon: <Scan size={13} />, text: "AI Damage Detection" },
                  { icon: <Shield size={13} />, text: "Damage Assessment" },
                  { icon: <LayoutDashboard size={13} />, text: "Analytics Dashboard" },
                  { icon: <ExternalLink size={13} />, text: "PDF Report Export" },
                  { icon: <Mail size={13} />, text: "Email Reports" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 hover:text-orange-400 transition cursor-default">
                    <span className="text-orange-500/60">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT COL */}
            <div>
              <h3 className="text-white font-bold mb-5 flex items-center gap-2">
                <Mail size={16} className="text-orange-400" />
                Contact
              </h3>
              <div className="space-y-4 text-gray-400 text-sm">
                <a
                  href="mailto:pratik@example.com"
                  className="flex items-center gap-3 hover:text-orange-400 transition group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-orange-500/15 transition">
                    <Mail size={14} />
                  </div>
                  <span>pratik@example.com</span>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Phone size={14} />
                  </div>
                  <span>+91 XXXXX XXXXX</span>
                </div>
                <a
                  href="#"
                  className="flex items-center gap-3 hover:text-orange-400 transition group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-orange-500/15 transition">
                    <GitBranch size={14} />
                  </div>
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>

          </div>

          {/* BOTTOM BAR */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-12 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-xs">
            <span>© 2026 AI Vehicle Damage Analyzer. All rights reserved.</span>
            <span>Built with React · Flask · YOLO8s.pt · MongoDB · TailwindCSS</span>
          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;