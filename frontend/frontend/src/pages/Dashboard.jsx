import { useEffect, useState } from "react";
import axios from "axios";
import DamageChart from "../components/DamageChart";
import Navbar from "../components/Navbar";
import {
  Activity, Scan, AlertTriangle, TrendingUp, Image, Clock, Car, IndianRupee
} from "lucide-react";

function Dashboard() {
  const [reports, setReports] = useState([]);
  const [analytics, setAnalytics] = useState({
    total_scans: 0, avg_health: 0, critical_reports: 0,
    most_common_damage: "None", damage_distribution: {},
  });

  useEffect(() => {
    loadHistory();
    loadAnalytics();
  }, []);

  const loadHistory = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const response = await axios.get(`http://127.0.0.1:5000/history/${userId}`);
      setReports(response.data.reports || []);
    } catch (err) { console.log(err); }
  };

  const loadAnalytics = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const response = await axios.get(`http://127.0.0.1:5000/analytics/${userId}`);
      if (response.data.success) setAnalytics(response.data);
    } catch (err) { console.log(err); }
  };

  const analyticsCards = [
    { title: "Total Scans", value: analytics.total_scans, icon: Scan, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    { title: "Most Common Damage", value: analytics.most_common_damage, icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
    { title: "Avg Vehicle Health", value: `${analytics.avg_health}%`, icon: Activity, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
    { title: "Critical Reports", value: analytics.critical_reports, icon: TrendingUp, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  ];

  const damageColors = {
    Low:    { text: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/25" },
    Medium: { text: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/25" },
    High:   { text: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/25" },
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 pt-32 pb-20">

        {/* PAGE HEADER */}
        <div className="mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 badge-orange mb-4">
            <Activity size={13} />
            <span>Personal Analytics</span>
          </div>
          <h1 className="text-5xl font-black text-white">
            Dashboard{" "}
            <span className="gradient-text-orange">Analytics</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-xl">
            Track your vehicle scan history, review damage patterns, and monitor vehicle health trends.
          </p>
        </div>

        {/* ANALYTICS CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {analyticsCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className={`glass rounded-[20px] p-6 border ${card.border} hover:-translate-y-2 transition-all duration-400 animate-fade-in-up`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-4`}>
                  <Icon className={card.color} size={20} />
                </div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">{card.title}</p>
                <h3 className={`text-3xl font-black ${card.color} capitalize`}>{card.value}</h3>
              </div>
            );
          })}
        </div>

        {/* CHART */}
        <div className="glass rounded-[24px] p-8 border border-white/7 mb-10 animate-fade-in-up">
          <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-orange-400" />
            Damage Distribution
          </h2>
          <DamageChart damageData={analytics.damage_distribution} />
        </div>

        {/* HISTORY HEADER */}
        <div className="flex items-center justify-between mb-6 animate-fade-in-up">
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <Clock size={28} className="text-orange-400" />
            Previous Scans
            <span className="badge-orange text-xs">{reports.length} total</span>
          </h2>
        </div>

        {/* HISTORY CARDS */}
        {reports.length === 0 ? (
          <div className="glass rounded-[24px] p-16 text-center border border-white/7 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl glass-orange flex items-center justify-center mx-auto mb-5">
              <Scan className="text-orange-400" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Scans Yet</h3>
            <p className="text-gray-400">Upload a vehicle image to get your first AI inspection report.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {reports.map((report, index) => {
              const dc = damageColors[report.damage_level] || damageColors.Low;
              return (
                <div
                  key={index}
                  className="card-premium border border-white/6 overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  {/* IMAGE */}
                  <div className="relative h-48 overflow-hidden">
                    {report.prediction_image ? (
                      <img
                        src={report.prediction_image}
                        alt={report.prediction}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        <Image className="text-gray-700" size={40} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* DAMAGE LEVEL PILL */}
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-xl text-xs font-bold ${dc.bg} ${dc.text} border ${dc.border}`}>
                      {report.damage_level} Risk
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <h3 className="text-xl font-black text-white capitalize mb-4">
                      {report.prediction?.replace(/_/g, " ")}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Activity size={13} className="text-orange-400" />
                        <span>{report.confidence}% confidence</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Car size={13} className="text-blue-400" />
                        <span>{report.vehicle_health} health</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 col-span-2">
                        <IndianRupee size={13} className="text-green-400" />
                        <span>{report.repair_cost}</span>
                      </div>
                    </div>

                    {/* REPLACEMENT BADGE */}
                    <div className="mt-4">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-xl ${
                        report.replacement_needed === "Yes"
                          ? "bg-red-500/10 text-red-400 border border-red-500/25"
                          : "bg-green-500/10 text-green-400 border border-green-500/25"
                      }`}>
                        {report.replacement_needed === "Yes" ? "⚠ Replacement Needed" : "✓ Repair Possible"}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;