import { useState } from "react";
import axios from "axios";

import UploadSection from "./UploadSection";
import ResultCard from "./ResultCard";
import AnalyticsCards from "./AnalyticsCards";
import AIReport from "./AIReport";
import AISummary from "./AISummary";
import AIInsights from "./AIInsights";
import Accessories from "./Accessories";

function UploadBox() {
const [file, setFile] = useState(null);
const [preview, setPreview] = useState(null);

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const [scanStatus, setScanStatus] = useState("");
const [analysisTime, setAnalysisTime] = useState("");

const [prediction, setPrediction] = useState("");
const [confidence, setConfidence] = useState("");

const [recommendations, setRecommendations] = useState([]);

const [brand, setBrand] = useState("");

const [damageLevel, setDamageLevel] = useState("");
const [replacementNeeded, setReplacementNeeded] = useState("");

const [aiSummary, setAiSummary] = useState("");
const [vehicleHealth, setVehicleHealth] = useState("");
const [repairCost, setRepairCost] = useState("");
const [aiInsights, setAiInsights] = useState([]);

const [allDetections, setAllDetections] = useState([]);
const [predictionImage, setPredictionImage] = useState("");

const handleImage = (e) => {
const selectedFile = e.target.files[0];


if (selectedFile) {
  setFile(selectedFile);
  setPreview(URL.createObjectURL(selectedFile));

  setPrediction("");
  setConfidence("");
  setRecommendations([]);
  setAllDetections([]);
  setError("");
}


};

const analyzeCar = async () => {
if (!file) {
setError("Please upload an image first.");
return;
}


setLoading(true);
setError("");

const formData = new FormData();
formData.append("image", file);

formData.append("user_id", localStorage.getItem("user_id"));

try {
  setScanStatus("Uploading Image...");

  const response = await axios.post(
    "http://127.0.0.1:5000/predict",
    formData
  );

  if (!response.data.success) {
    setError(response.data.message);
    setLoading(false);
    return;
  }

  setScanStatus("Generating AI Report...");

  const aiPrediction =
    response.data.prediction || "Unknown";

  const aiConfidence =
    response.data.confidence || 95;

  setPrediction(aiPrediction);
  setConfidence(aiConfidence);

  setBrand(response.data.brand);

  setAllDetections(
    response.data.all_detections || []
  );

  setDamageLevel(
    response.data.damage_level
  );

  setReplacementNeeded(
    response.data.replacement_needed
  );

  setAiSummary(
    response.data.ai_summary
  );

  setVehicleHealth(
    response.data.vehicle_health
  );

  setRepairCost(
    response.data.repair_cost
  );

  setAiInsights(
    response.data.ai_insights || []
  );

  setAnalysisTime(
    new Date().toLocaleString()
  );

  setPredictionImage(
    response.data.prediction_image 
  );

  let accessories = [];

  accessories = [
    {
      id: 1,
      name: "Premium Leather Seat Cover",
      price: 2999,
      rating: 4.8,
      image: "/products/seatcover.jpg",
    },
    {
      id: 2,
      name: "Android Display",
      price: 8999,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    },
    {
      id: 3,
      name: "Reverse Camera",
      price: 2499,
      rating: 4.4,
      image:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b",
    },
    {
      id: 4,
      name: "Luxury Floor Mats",
      price: 1999,
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1504215680853-026ed2a45def",
    },
  ];

  setRecommendations(accessories);

  setScanStatus("Analysis Completed");
} catch (error) {
  console.log(error);

  setError(
    "Failed to connect with AI server."
  );

  setScanStatus("");
}

setLoading(false);


};


// DOWNLOAD PDF REPORT

const downloadReport = async () => {
  try {

    const response = await axios.post(
      "http://127.0.0.1:5000/generate-report",
      {
        prediction,
        confidence,
        damageLevel,
        vehicleHealth,
        repairCost,
        replacementNeeded,
      }
    );

    const link = document.createElement("a");

    link.href = response.data.pdf_url;

    link.download = "AI_Damage_Report.pdf";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  } catch (error) {

    console.log(error);

    alert("Failed to generate PDF");

  }
};

const sendEmailReport = async () => {

  const email = prompt("Enter Email Address");

  if (!email) return;

  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/send-report-email",
      {
        email,
      }
    );
    alert(response.data.message);
  } catch (error) {
    console.log(error);
    alert("Failed to send email");
  }
};

return ( <div className="w-full max-w-[1400px] mx-auto mt-10 px-4"> <div className="bg-[#111111] border border-gray-800 rounded-[30px] p-8 shadow-2xl">


    <UploadSection
      handleImage={handleImage}
      preview={preview}
      analyzeCar={analyzeCar}
      loading={loading}
      predictionImage={predictionImage}
    />

    {scanStatus && (
      <div className="mt-4 text-center text-orange-400 font-medium">
        {scanStatus}
      </div>
    )}

    {error && (
      <div className="mt-4 bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-xl text-center">
        {error}
      </div>
    )}

    {analysisTime && (
      <div className="mt-4 text-center text-gray-400 text-sm">
        Last Analysis: {analysisTime}
      </div>
    )}

    {prediction && (
      <>
        <ResultCard
          prediction={prediction}
          confidence={confidence}
          allDetections={allDetections}
        />
       

        <AnalyticsCards
          repairCost={repairCost}
          vehicleHealth={vehicleHealth}
          brand={brand}
          confidence={confidence}
        />

        <AISummary
          aiSummary={aiSummary}
        />

        <AIInsights
          aiInsights={aiInsights}
        />

        <AIReport
          damageLevel={damageLevel}
          replacementNeeded={
            replacementNeeded
          }
        />

      <div className="mt-8 text-center">
        <button
         onClick={downloadReport}
          className="
          px-8
          py-4
          rounded-2xl
        bg-green-600
        hover:bg-green-700
          font-bold
          transition
          "
        >
       Download AI Report PDF
        </button>
      </div>

       <button
        onClick={sendEmailReport}
        className="
        ml-4
        px-8
        py-4
        rounded-2xl
      bg-blue-600
      hover:bg-blue-700
        font-bold
        "
       >
       Email Report
      </button>

        <Accessories
          recommendations={
            recommendations
          }
        />
      </>
    )}
  </div>
</div>


);
}

export default UploadBox;
