import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DamageChart({ damageData }) {
  const chartData = Object.entries(
    damageData || {}
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    "#f97316",
    "#ef4444",
    "#22c55e",
    "#3b82f6",
    "#eab308",
    "#8b5cf6",
  ];

  return (
    <div className="bg-[#161616] rounded-3xl p-6 border border-gray-800">

      <h2 className="text-3xl font-bold text-white mb-6">
        Damage Distribution
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {chartData.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default DamageChart;