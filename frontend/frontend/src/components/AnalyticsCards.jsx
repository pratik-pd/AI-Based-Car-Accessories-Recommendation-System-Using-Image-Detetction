import {
  BadgeCheck,
  IndianRupee,
  Car,
  Activity,
} from "lucide-react";

function AnalyticsCards({
  brand,
  repairCost,
  vehicleHealth,
  confidence,
}) {

  const cards = [
    {
      title: "AI Confidence",
      value: confidence || "95%",
      icon: <BadgeCheck />,
      color: "text-orange-500",
    },
    {
      title: "Vehicle Brand",
      value: brand || "Unknown",
      icon: <Car />,
      color: "text-red-400",
    },
    {
      title: "Repair Cost",
      value: repairCost || "₹0",
      icon: <IndianRupee />,
      color: "text-green-400",
    },
    {
      title: "Vehicle Health",
      value: vehicleHealth || "100%",
      icon: <Activity />,
      color: "text-cyan-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

      {cards.map((item, index) => (

        <div
          key={index}
          className="bg-[#161616] border border-gray-800 rounded-3xl p-6 hover:border-orange-500 hover:-translate-y-2 transition-all duration-300"
        >

          <div className={`${item.color} mb-4`}>
            {item.icon}
          </div>

          <p className="text-gray-400">
            {item.title}
          </p>

          <h2 className={`text-3xl font-black mt-4 ${item.color}`}>
            {item.value}
          </h2>

        </div>

      ))}

    </div>
  );
}

export default AnalyticsCards;