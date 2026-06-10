import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Scan, ShoppingBag, DollarSign, Activity, Eye } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const COLORS = ["#f97316", "#a855f7", "#3b82f6", "#10b981", "#ef4444", "#eab308"];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:5000/admin/stats");
        if (res.data.success) {
          setStats(res.data.stats);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        setError("Failed to fetch dashboard statistics.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading admin dashboard statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-[24px] p-8 border border-red-500/20 text-center max-w-xl mx-auto mt-10">
        <h2 className="text-red-400 font-bold text-xl mb-2">Error</h2>
        <p className="text-gray-400 text-sm mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  const kpis = [
    { name: "Total Users", value: stats?.total_users || 0, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
    { name: "Total Scans", value: stats?.total_scans || 0, icon: Scan, color: "text-purple-400", bg: "bg-purple-500/10" },
    { name: "Accessories Sold", value: stats?.total_orders || 0, icon: ShoppingBag, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { name: "Total Revenue", value: `₹${(stats?.total_revenue || 0).toLocaleString()}`, icon: DollarSign, color: "text-orange-400", bg: "bg-orange-500/10" }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">Console Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Platform analytics and operational metrics</p>
        </div>
        <div className="flex items-center gap-2 text-xs badge-orange">
          <Activity size={12} className="animate-pulse" />
          <span>Real-time Sync</span>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="glass rounded-2xl p-6 border border-white/7 flex items-center justify-between hover:border-orange-500/20 transition-all duration-300">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{kpi.name}</p>
                <h3 className="text-3xl font-black mt-2 text-white">{kpi.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bg}`}>
                <Icon className={kpi.color} size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* EXTRA STATS METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-2xl p-6 border border-white/7 text-center">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Average Vehicle Health</p>
          <h4 className="text-4xl font-black text-green-400 mt-2">{stats?.avg_health || 0}%</h4>
        </div>
        <div className="glass rounded-2xl p-6 border border-white/7 text-center">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Top Detected Damage</p>
          <h4 className="text-3xl font-black text-orange-400 mt-3 uppercase">{stats?.most_common_damage || "None"}</h4>
        </div>
        <div className="glass rounded-2xl p-6 border border-white/7 text-center">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Catalog Accessories</p>
          <h4 className="text-4xl font-black text-blue-400 mt-2">{stats?.total_accessories || 0}</h4>
        </div>
      </div>

      {/* TIMELINE CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SCAN TIMELINE AREA CHART */}
        <div className="glass rounded-2xl p-6 border border-white/7">
          <h3 className="text-lg font-bold text-white mb-6">AI Vehicle Scan Activity</h3>
          <div className="h-80 w-full">
            {stats?.scans_timeline?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.scans_timeline}>
                  <defs>
                    <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="date" stroke="#666" fontSize={11} />
                  <YAxis stroke="#666" fontSize={11} allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px" }} labelStyle={{ color: "#aaa" }} />
                  <Area type="monotone" dataKey="scans" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorScans)" name="Scans" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-sm">No scan history recorded yet.</div>
            )}
          </div>
        </div>

        {/* REVENUE TIMELINE BAR CHART */}
        <div className="glass rounded-2xl p-6 border border-white/7">
          <h3 className="text-lg font-bold text-white mb-6">Accessory Store Sales Revenue</h3>
          <div className="h-80 w-full">
            {stats?.sales_timeline?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.sales_timeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="date" stroke="#666" fontSize={11} />
                  <YAxis stroke="#666" fontSize={11} />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px" }} labelStyle={{ color: "#aaa" }} />
                  <Bar dataKey="revenue" fill="#f97316" radius={[4, 4, 0, 0]} name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-sm">No sales data logged yet.</div>
            )}
          </div>
        </div>

      </div>

      {/* DAMAGE DISTRIBUTION PIE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass rounded-2xl p-6 border border-white/7 lg:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Damage Distribution</h3>
            <p className="text-gray-400 text-xs mb-4">Breakdown of AI detected vehicle problems</p>
          </div>
          <div className="h-60 w-full relative flex items-center justify-center">
            {stats?.damage_distribution?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.damage_distribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {stats.damage_distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px" }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-sm">No damage data.</div>
            )}
          </div>
        </div>

        {/* DISTRIBUTION LEGEND GRID */}
        <div className="glass rounded-2xl p-6 border border-white/7 lg:col-span-2">
          <h3 className="text-lg font-bold text-white mb-6">Detections Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stats?.damage_distribution?.length > 0 ? (
              stats.damage_distribution.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/3 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-gray-300 font-semibold text-sm uppercase">{item.name}</span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white">{item.value}</span>
                    <span className="text-xs text-gray-500">Scans</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-gray-500 text-sm">No damage logs.</div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;
