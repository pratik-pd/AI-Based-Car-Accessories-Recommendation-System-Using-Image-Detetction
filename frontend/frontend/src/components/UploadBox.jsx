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

  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");

  const [recommendations, setRecommendations] = useState([]);

  const [vehicleCategory, setVehicleCategory] = useState("");
  const [vehicleUsage, setVehicleUsage] = useState("");

  const [brand, setBrand] = useState("");
  const [scanType, setScanType] = useState("");
  const [damageStatus, setDamageStatus] = useState("");
  const [damageLevel, setDamageLevel] = useState("");
  const [replacementNeeded, setReplacementNeeded] = useState("");

  const [aiSummary, setAiSummary] = useState("");
  const [vehicleHealth, setVehicleHealth] = useState("");
  const [repairCost, setRepairCost] = useState("");
  const [aiInsights, setAiInsights] = useState([]);

  const handleImage = (e) => {

    const selectedFile = e.target.files[0];

    if (selectedFile) {

      setFile(selectedFile);

      setPreview(URL.createObjectURL(selectedFile));

      setPrediction("");
      setConfidence("");
      setRecommendations([]);
    }
  };

  const analyzeCar = async () => {

    if (!file) {
      alert("Please upload image first");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("image", file);

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );
      console.log(response.data)

      if (!response.data.success) {

        alert(response.data.message);

        setLoading(false);

        return;
      }

      const aiPrediction = response.data.prediction || "Unknown";

      const aiConfidence = response.data.confidence
        ? `${response.data.confidence}%`
        : "95%";

      setPrediction(aiPrediction);
      setConfidence(aiConfidence);

      setBrand(response.data.brand);
      setScanType(response.data.scan_type);

      setDamageStatus(response.data.damage_status);
      setDamageLevel(response.data.damage_level);

      setReplacementNeeded(response.data.replacement_needed);

      setAiSummary(response.data.ai_summary);

      setVehicleHealth(response.data.vehicle_health);

      setRepairCost(response.data.repair_cost);

      setAiInsights(response.data.ai_insights);

      let accessories = [];

      let category = "";
      let usage = "";

      if (
        aiPrediction.toLowerCase().includes("suv")
      ) {

        category = "SUV Vehicle";

        usage = "Adventure Driving";

        accessories = [

          {
            name: "Roof Rails",
            price: "₹5,499",
            rating: "4.6",
            image:
              "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
            link: "https://www.amazon.in/",
          },

          {
            name: "Fog Lamps",
            price: "₹2,999",
            rating: "4.5",
            image:
              "https://images.unsplash.com/photo-1549399542-7e3f8b79c341",
            link: "https://www.amazon.in/",
          },

          {
            name: "Bull Bar",
            price: "₹7,999",
            rating: "4.7",
            image:
              "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
            link: "https://www.amazon.in/",
          },

          {
            name: "Off Road Tires",
            price: "₹18,999",
            rating: "4.9",
            image:
              "https://images.unsplash.com/photo-1517524206127-48bbd363f3aa",
            link: "https://www.amazon.in/",
          },
        ];

      } else {

        category = "Family Vehicle";

        usage = "Daily Commute";

        accessories = [

          {
            name: "Seat Covers",
            price: "₹2,999",
            rating: "4.5",
            image:
              "https://images.unsplash.com/photo-1493238792000-8113da705763",
            link: "https://www.amazon.in/",
          },

          {
            name: "Android Display",
            price: "₹8,999",
            rating: "4.8",
            image:
              "https://images.unsplash.com/photo-1502877338535-766e1452684a",
            link: "https://www.amazon.in/",
          },

          {
            name: "Reverse Camera",
            price: "₹2,499",
            rating: "4.4",
            image:
              "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b",
            link: "https://www.amazon.in/",
          },

          {
            name: "Luxury Floor Mats",
            price: "₹1,999",
            rating: "4.3",
            image:
              "https://images.unsplash.com/photo-1504215680853-026ed2a45def",
            link: "https://www.amazon.in/",
          },
        ];
      }

      setRecommendations(accessories);

      setVehicleCategory(category);

      setVehicleUsage(usage);

    } catch (error) {

      console.log(error);

      alert("Backend Error");
    }

    setLoading(false);
  };

  return (

    <div className="w-full max-w-[1400px] mx-auto mt-10 px-4">

      <div className="bg-[#111111] border border-gray-800 rounded-[30px] p-8 shadow-2xl">

        <UploadSection
          handleImage={handleImage}
          preview={preview}
          analyzeCar={analyzeCar}
          loading={loading}
        />

        {prediction && (
          <>
            <ResultCard
              prediction={prediction}
              confidence={confidence}
            />

            <AnalyticsCards
              repairCost={repairCost}
              vehicleHealth={vehicleHealth}
              vehicleCategory={vehicleCategory}
              vehicleUsage={vehicleUsage}
              brand={brand}
            />

            <AISummary aiSummary={aiSummary} />

            <AIInsights aiInsights={aiInsights} />

            <AIReport
              damageLevel={damageLevel}
              replacementNeeded={replacementNeeded}
            />

            <Accessories recommendations={recommendations} />
          </>
        )}

      </div>

    </div>
  );
}

export default UploadBox;