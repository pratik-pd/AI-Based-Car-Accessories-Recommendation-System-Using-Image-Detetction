import { useEffect, useState } from "react";
import axios from "axios";

import HistoryCard from "../components/HistoryCard";

function Dashboard() {

  const [reports, setReports] = useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {
      const userId = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:5000/history${userId}`,
      );

      setReports(response.data.reports);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-5xl font-black text-white">

        Vehicle Dashboard

      </h1>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-[#181818] p-6 rounded-3xl">
          <h3>Total Scans</h3>

          <p className="text-4xl font-black">
            {reports.length}
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">

        {reports.map((report, index) => (

          <HistoryCard
            key={index}
            report={report}
          />

        ))}

      </div>

    </div>
  );
}

export default Dashboard;