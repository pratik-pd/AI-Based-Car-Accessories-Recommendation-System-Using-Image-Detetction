import { useEffect, useState } from "react";
import axios from "axios";
import { Scan, Calendar, Mail, AlertTriangle, Cpu, Activity, Image as ImageIcon } from "lucide-react";

function AdminScans() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScans = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:5000/admin/scans");
        if (res.data.success) {
          setScans(res.data.scans);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        setError("Failed to fetch scan logs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchScans();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading vehicle scan logs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-[24px] p-6 border border-red-500/20 text-center max-w-xl mx-auto mt-10">
        <h2 className="text-red-400 font-bold text-lg mb-2">Error</h2>
        <p className="text-gray-400 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-black text-white">AI Diagnostic Logs</h1>
        <p className="text-gray-400 text-sm mt-1">Audit trail of all vehicle scans and AI detections</p>
      </div>

      {scans.length === 0 ? (
        <div className="glass rounded-[28px] p-16 text-center border border-white/7">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center mx-auto mb-6">
            <Scan className="text-orange-400" size={28} />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">No Scans Recorded</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Once users run predictions via the "Scan Vehicle" tool, logs of their results will be loaded here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {scans.map((scan) => (
            <div
              key={scan.id}
              className="glass rounded-[24px] border border-white/8 overflow-hidden flex flex-col justify-between hover:border-orange-500/20 transition-all duration-300"
            >
              
              {/* IMAGE HOVER */}
              <div className="h-64 relative bg-black/40 border-b border-white/5 flex items-center justify-center">
                {scan.prediction_image ? (
                  <img
                    src={scan.prediction_image}
                    alt={scan.prediction}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-600 flex flex-col items-center gap-2">
                    <ImageIcon size={40} />
                    <span className="text-xs">No Image Available</span>
                  </div>
                )}
                
                {/* FLOATING DAMAGE LEVEL BADGE */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${
                      scan.damage_level === "High"
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                        : scan.damage_level === "Medium"
                        ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                        : "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    }`}
                  >
                    {scan.damage_level} Severity
                  </span>
                </div>
              </div>

              {/* DETAILS */}
              <div className="p-6 space-y-4">
                
                {/* SCAN TITLE */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div>
                    <h3 className="text-white font-bold text-lg leading-none uppercase tracking-wide">
                      {scan.prediction || "Unknown Damage"}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                      <Calendar size={12} />
                      <span>{scan.created_at?.split(".")[0] || "N/A"}</span>
                    </div>
                  </div>
                  
                  {/* CONFIDENCE ACCORDION */}
                  <div className="text-right">
                    <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider block">AI Confidence</span>
                    <span className="gradient-text-orange font-black text-2xl">
                      {scan.confidence ? `${scan.confidence}%` : "0%"}
                    </span>
                  </div>
                </div>

                {/* USER LOG */}
                <div className="flex items-center gap-2.5 text-sm py-2 px-3.5 rounded-xl bg-white/3 border border-white/5 text-gray-300">
                  <Mail size={14} className="text-gray-500 shrink-0" />
                  <span className="font-semibold truncate">Uploaded by: {scan.user_email}</span>
                </div>

                {/* KPI METRICS */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/2 border border-white/4">
                    <span className="text-gray-500 block">Est. Repair Cost</span>
                    <span className="text-white font-bold text-sm block mt-1">{scan.repair_cost || "N/A"}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/2 border border-white/4">
                    <span className="text-gray-500 block">Vehicle Health</span>
                    <span className="text-green-400 font-bold text-sm block mt-1">{scan.vehicle_health || "N/A"}</span>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default AdminScans;
