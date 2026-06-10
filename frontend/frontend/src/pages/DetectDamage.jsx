import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";
import { Scan, Sparkles } from "lucide-react";

function DetectDamage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {/* PAGE HEADER */}
      <div className="pt-32 pb-8 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-orange-500/8 blur-[80px] rounded-full" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 badge-orange mb-5 animate-fade-in-down">
            <div className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
            <Sparkles size={13} />
            <span>YOLOv8 Damage Detection Engine</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white animate-fade-in-up">
            AI Vehicle{" "}
            <span className="gradient-text-orange">Inspection</span>
          </h1>
          <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto animate-fade-in-up delay-100">
            Upload a vehicle image and receive an instant AI-powered damage report with repair recommendations.
          </p>
        </div>
      </div>

      {/* UPLOAD BOX */}
      <div className="pb-20">
        <UploadBox />
      </div>
    </div>
  );
}

export default DetectDamage;