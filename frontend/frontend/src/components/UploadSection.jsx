import { Upload, Sparkles, ImageIcon, Camera } from "lucide-react";
import { useState } from "react"

function UploadSection({
  handleImage,
  preview,
  analyzeCar,
  loading,
  predictionImage,
}) {

  const [dragging, setDragging] = useState(false);

  // this is drag and drop logic
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true)
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      handleImage({ target: { files: [droppedFile] } });
    }
  };

  const handleDragLeave = () => {
    setDragging(false);
  };



  return (
    <>
      {/* UPLOAD DROP ZONE */}
      <div className="mt-2">
        <label
          id="upload-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`group relative border-2 border-dashed rounded-[24px] p-12 flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ${dragging ? "border-orange-500 bg-orange-500/10 scale-[1.02]" : "border-orange-500/40"}`}
        // className="group relative border-2 border-dashed border-orange-500/40 hover:border-orange-500 rounded-[24px] p-12 flex flex-col justify-center items-center cursor-pointer transition-all duration-400 bg-gradient-to-b from-orange-500/3 to-transparent hover:bg-orange-500/5 hover:shadow-[0_0_40px_rgba(249,115,22,0.1)]"
        >
          {/* CORNER ACCENTS */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-orange-500/60 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-orange-500/60 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-orange-500/60 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-orange-500/60 rounded-br-lg" />

          {/* ICON */}
          <div className="w-20 h-20 rounded-2xl glass-orange flex items-center justify-center mb-6 group-hover:scale-110 group-hover:glow-orange transition-all duration-500">
            <Upload className="text-orange-400" size={36} />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Upload Vehicle Image</h3>
          <p className="text-gray-400 text-center leading-relaxed">
            Drag & Drop your vehicle image here
            <br />
            <span className="text-gray-500">or click to browse files</span>
          </p>
          <div className="flex items-center gap-3 mt-4 text-xs text-gray-600">
            <span className="flex items-center gap-1"><Camera size={11} /> JPG</span>
            <span>·</span>
            <span>PNG</span>
            <span>·</span>
            <span>JPEG</span>
            <span>·</span>
            <span>Max 10MB</span>
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />
        </label>
      </div>

      {/* PREVIEW IMAGES */}
      {(preview || predictionImage) && (
        <div className={`mt-8 grid ${preview && predictionImage ? "md:grid-cols-2" : "grid-cols-1"} gap-6`}>

          {/* ORIGINAL IMAGE */}
          {preview && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <ImageIcon size={16} className="text-blue-400" />
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest">Original Image</h3>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-blue-500/20">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full max-h-[420px] object-cover"
                />
              </div>
            </div>
          )}

          {/* AI PREDICTION IMAGE */}
          {predictionImage && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                <Sparkles size={16} className="text-green-400" />
                <h3 className="text-sm font-bold text-green-400 uppercase tracking-widest">AI Detection Result</h3>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-green-500/40 glow-green">
                <img
                  src={`${predictionImage}?t=${Date.now()}`}
                  alt="AI Detection"
                  className="w-full max-h-[420px] object-cover"
                />
                <div className="absolute top-3 right-3 badge-green text-[10px]">✓ Analyzed</div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ANALYZE BUTTON */}
      <button
        id="analyze-btn"
        onClick={analyzeCar}
        disabled={loading}
        className={`w-full mt-8 py-5 rounded-2xl text-lg font-bold transition-all duration-400 flex items-center justify-center gap-3 ${loading
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "btn-primary text-white"
          }`}
      >
        {loading ? (
          <>
            <div className="w-6 h-6 border-2 border-gray-600 border-t-orange-400 rounded-full animate-spin" />
            <span>AI Analyzing Vehicle...</span>
          </>
        ) : (
          <>
            <Sparkles size={22} />
            <span>Analyze Vehicle with AI</span>
          </>
        )}
      </button>

      {/* LOADER OVERLAY */}
      {loading && (
        <div className="mt-8 glass rounded-2xl p-6 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 border-2 border-gray-700 border-t-orange-500 rounded-full animate-spin" />
            <div className="w-8 h-8 border-2 border-gray-700 border-t-yellow-400 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.7s" }} />
            <div className="w-6 h-6 border-2 border-gray-700 border-t-green-400 rounded-full animate-spin" style={{ animationDuration: "0.5s" }} />
          </div>
          <p className="text-orange-400 font-semibold">YOLOv8 Processing Image...</p>
          <p className="text-gray-500 text-sm mt-1">Detecting damage types and analyzing vehicle health</p>
          <div className="mt-4 w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full animate-[shimmer_1.5s_linear_infinite] w-2/3" />
          </div>
        </div>
      )}
    </>
  );
}

export default UploadSection;
