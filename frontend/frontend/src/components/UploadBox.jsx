import { useState } from "react";
import axios from "axios";
import UploadSection from "./UploadSection";
import ResultCard from "./ResultCard";
import AnalyticsCards from "./AnalyticsCards";
import AIReport from "./AIReport";
import AISummary from "./AISummary";
import AIInsights from "./AIInsights";
import Accessories from "./Accessories";
import { CheckCircle, AlertCircle, Clock, Download, Mail } from "lucide-react";

function UploadBox() {
  const [file, setFile]                     = useState(null);
  const [preview, setPreview]               = useState(null);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState("");
  const [scanStatus, setScanStatus]         = useState("");
  const [analysisTime, setAnalysisTime]     = useState("");
  const [prediction, setPrediction]         = useState("");
  const [confidence, setConfidence]         = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [brand, setBrand]                   = useState("");
  const [damageLevel, setDamageLevel]       = useState("");
  const [replacementNeeded, setReplacementNeeded] = useState("");
  const [aiSummary, setAiSummary]           = useState("");
  const [vehicleHealth, setVehicleHealth]   = useState("");
  const [repairCost, setRepairCost]         = useState("");
  const [aiInsights, setAiInsights]         = useState([]);
  const [allDetections, setAllDetections]   = useState([]);
  const [predictionImage, setPredictionImage] = useState("");

  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setPrediction(""); setConfidence(""); setRecommendations([]);
      setAllDetections([]); setError(""); setScanStatus("");
    }
  };

  const analyzeCar = async () => {
    if (!file) { setError("Please upload a vehicle image first."); return; }
    setLoading(true); setError("");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("user_id", localStorage.getItem("user_id"));
    try {
      setScanStatus("Uploading Image...");
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      if (!response.data.success) { setError(response.data.message); setLoading(false); return; }
      setScanStatus("Generating AI Report...");
      const d = response.data;
      setPrediction(d.prediction || "Unknown");
      setConfidence(d.confidence || 95);
      setBrand(d.brand);
      setAllDetections(d.all_detections || []);
      setDamageLevel(d.damage_level);
      setReplacementNeeded(d.replacement_needed);
      setAiSummary(d.ai_summary);
      setVehicleHealth(d.vehicle_health);
      setRepairCost(d.repair_cost);
      setAiInsights(d.ai_insights || []);
      setAnalysisTime(new Date().toLocaleString());
      setPredictionImage(d.prediction_image);
      setRecommendations(d.recommendations || []);
      setScanStatus("Analysis Completed");
    } catch (err) {
      setError("Failed to connect to AI server. Make sure the backend is running.");
      setScanStatus("");
    }
    setLoading(false);
  };

  const downloadReport = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/generate-report", {
        prediction, confidence, damageLevel, vehicleHealth, repairCost, replacementNeeded,
      });
      const link = document.createElement("a");
      link.href = response.data.pdf_url;
      link.download = "AI_Damage_Report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch { alert("Failed to generate PDF"); }
  };

  const sendEmailReport = async () => {
    const email = prompt("Enter your email address:");
    if (!email) return;
    try {
      const response = await axios.post("http://127.0.0.1:5000/send-report-email", { email });
      alert(response.data.message);
    } catch { alert("Failed to send email"); }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4">

      {/* MAIN CARD */}
      <div className="glass rounded-[28px] p-8 border border-white/7 shadow-2xl">
        <UploadSection
          handleImage={handleImage}
          preview={preview}
          analyzeCar={analyzeCar}
          loading={loading}
          predictionImage={predictionImage}
        />

        {/* SCAN STATUS */}
        {scanStatus && !loading && (
          <div className={`mt-5 flex items-center justify-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold animate-fade-in ${
            scanStatus === "Analysis Completed"
              ? "bg-green-500/10 border border-green-500/30 text-green-400"
              : "bg-orange-500/10 border border-orange-500/30 text-orange-400"
          }`}>
            {scanStatus === "Analysis Completed"
              ? <CheckCircle size={16} />
              : <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
            }
            {scanStatus}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mt-5 flex items-start gap-3 px-5 py-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm animate-fade-in">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ANALYSIS TIME */}
        {analysisTime && (
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-xs">
            <Clock size={12} />
            Last Analysis: {analysisTime}
          </div>
        )}
      </div>

      {/* RESULTS SECTION */}
      {prediction && (
        <div className="animate-fade-in-up mt-6 space-y-6">

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

          <AISummary aiSummary={aiSummary} />
          <AIInsights aiInsights={aiInsights} />
          <AIReport damageLevel={damageLevel} replacementNeeded={replacementNeeded} />

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <button
              id="download-report-btn"
              onClick={downloadReport}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 font-bold hover:bg-green-500/20 hover:border-green-500/60 transition-all duration-300 hover:-translate-y-1"
            >
              <Download size={20} />
              Download PDF Report
            </button>

            <button
              id="email-report-btn"
              onClick={sendEmailReport}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold hover:bg-blue-500/20 hover:border-blue-500/60 transition-all duration-300 hover:-translate-y-1"
            >
              <Mail size={20} />
              Email Report
            </button>
          </div>

          <Accessories recommendations={recommendations} />

        </div>
      )}

    </div>
  );
}

export default UploadBox;
