// import { useEffect, useState } from "react";
// import axios from "axios";

// function Dashboard() {

//   const [reports, setReports] = useState([]);

//   useEffect(() => {

//     loadHistory();

//   }, []);

//   const loadHistory = async () => {

//     try {

//       const userId =
//         localStorage.getItem("user_id");

//       const response =
//         await axios.get(
//           `http://127.0.0.1:5000/history/${userId}`
//         );

//       setReports(
//         response.data.reports || []
//       );

//     } catch (error) {

//       console.log(error);

//     }
//   };

//   return (

//     <div className="min-h-screen bg-black p-10">

//       <h1 className="text-5xl font-black text-white mb-10">
//         Scan History
//       </h1>

//       <div className="grid md:grid-cols-2 gap-6">

//         {reports.map((report, index) => (

//           <div
//             key={index}
//             className="
//             bg-[#161616]
//             border
//             border-gray-800
//             rounded-3xl
//             p-6
//             "
//           >

//             <img
//               src={report.prediction_image}
//               alt=""
//               className="
//               w-full
//               h-60
//               object-cover
//               rounded-2xl
//               "
//             />

//             <h2 className="text-2xl font-bold text-white mt-4">
//               {report.prediction}
//             </h2>

//             <p className="text-orange-400">
//               Confidence:
//               {" "}
//               {report.confidence}%
//             </p>

//             <p className="text-gray-400">
//               Damage Level:
//               {" "}
//               {report.damage_level}
//             </p>

//             <p className="text-gray-400">
//               Repair Cost:
//               {" "}
//               {report.repair_cost}
//             </p>

//           </div>

//         ))}

//       </div>

//     </div>

//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import axios from "axios";
import DamageChart from "../components/DamageChart";

function Dashboard() {
  const [reports, setReports] = useState([]);

  const [analytics, setAnalytics] = useState({
    total_scans: 0,
    avg_health: 0,
    critical_reports: 0,
    most_common_damage: "None",
    damage_distribution: {},
  });

  useEffect(() => {
    loadHistory();
    loadAnalytics();
  }, []);

  const loadHistory = async () => {
    try {
      const userId =
        localStorage.getItem("user_id");

      const response = await axios.get(
        `http://127.0.0.1:5000/history/${userId}`
      );

      setReports(
        response.data.reports || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const loadAnalytics = async () => {
    try {
      const userId =
        localStorage.getItem("user_id");

      const response = await axios.get(
        `http://127.0.0.1:5000/analytics/${userId}`
      );

      if (response.data.success) {
        setAnalytics(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black p-10">

      <h1 className="text-5xl font-black text-white mb-10">
        Dashboard Analytics
      </h1>

      {/* ANALYTICS CARDS */}

      <div className="grid md:grid-cols-4 gap-6 mb-12">

        <div className="bg-[#161616] border border-orange-500/20 rounded-3xl p-6">
          <h3 className="text-gray-400">
            Total Scans
          </h3>

          <h2 className="text-4xl font-black text-orange-500 mt-2">
            {analytics.total_scans}
          </h2>
        </div>

        <div className="bg-[#161616] border border-red-500/20 rounded-3xl p-6">
          <h3 className="text-gray-400">
            Most Common Damage
          </h3>

          <h2 className="text-2xl font-black text-red-400 mt-2">
            {analytics.most_common_damage}
          </h2>
        </div>

        <div className="bg-[#161616] border border-green-500/20 rounded-3xl p-6">
          <h3 className="text-gray-400">
            Avg Vehicle Health
          </h3>

          <h2 className="text-4xl font-black text-green-400 mt-2">
            {analytics.avg_health}%
          </h2>
        </div>

        <div className="bg-[#161616] border border-yellow-500/20 rounded-3xl p-6">
          <h3 className="text-gray-400">
            Critical Reports
          </h3>

          <h2 className="text-4xl font-black text-yellow-400 mt-2">
            {analytics.critical_reports}
          </h2>
        </div>

      </div>

      <div className="mb-12">
        <DamageChart damageData={analytics.damage_distribution} />
      </div>

      {/* HISTORY TITLE */}

      <h2 className="text-4xl font-black text-white mb-8">
        Previous Scans
      </h2>

      {/* HISTORY CARDS */}

      <div className="grid md:grid-cols-2 gap-6">

        {reports.map((report, index) => (

          <div
            key={index}
            className="
            bg-[#161616]
            border
            border-gray-800
            rounded-3xl
            p-6
            "
          >

            <img
              src={report.prediction_image}
              alt=""
              className="
              w-full
              h-60
              object-cover
              rounded-2xl
              "
            />

            <h2 className="text-2xl font-bold text-white mt-4">
              {report.prediction}
            </h2>

            <p className="text-orange-400 mt-2">
              Confidence: {report.confidence}%
            </p>

            <p className="text-gray-400">
              Damage Level: {report.damage_level}
            </p>

            <p className="text-gray-400">
              Repair Cost: {report.repair_cost}
            </p>

            <p className="text-gray-400">
              Vehicle Health: {report.vehicle_health}
            </p>

            <p
              className={`mt-2 font-bold ${
                report.replacement_needed ===
                "Yes"
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              Replacement Needed:
              {" "}
              {report.replacement_needed}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;