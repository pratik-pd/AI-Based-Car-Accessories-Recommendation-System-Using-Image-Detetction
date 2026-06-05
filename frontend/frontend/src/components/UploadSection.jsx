import { Upload, Sparkles, ImageIcon } from "lucide-react";

function UploadSection({
handleImage,
preview,
analyzeCar,
loading,
predictionImage,
}) {
return (
<>
{/* HEADER */} <div className="text-center"> <div className="flex justify-center items-center gap-3 mb-4"> <Sparkles
         className="text-orange-500"
         size={36}
       />


      <h1 className="text-4xl md:text-5xl font-black text-white">
        AI Vehicle Inspection
      </h1>
    </div>

    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
      Upload a vehicle image and receive an
      AI-powered inspection report including
      vehicle health, damage analysis,
      maintenance suggestions and smart
      recommendations.
    </p>
  </div>

  {/* UPLOAD BOX */}
  <div className="mt-12">
    <label
      className="
      group
      border-2
      border-dashed
      border-orange-500/60
      hover:border-orange-500
      rounded-[30px]
      p-12
      flex
      flex-col
      justify-center
      items-center
      cursor-pointer
      transition-all
      duration-300
      bg-gradient-to-b
      from-[#171717]
      to-[#0f0f0f]
      hover:scale-[1.01]
    "
    >
      <Upload
        className="
        text-orange-500
        mb-5
        group-hover:scale-110
        transition
      "
        size={60}
      />

      <h3 className="text-2xl font-bold text-white">
        Upload Vehicle Image
      </h3>

      <p className="text-gray-400 mt-3">
        Drag & Drop Vehicle Image
        <br />
        or click to browse
      </p>

      <p className="text-sm text-gray-500 mt-2">
        JPG, PNG, JPEG • Max 10MB
      </p>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImage}
      />
    </label>
  </div>

  {/* ORIGINAL IMAGE */}
  {preview && (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon
          size={22}
          className="text-orange-500"
        />

        <h3 className="text-xl font-bold text-white">
          Uploaded Image
        </h3>
      </div>

      <img
        src={preview}
        alt="preview"
        className="
        w-full
        max-h-[550px]
        object-cover
        rounded-[30px]
        border
        border-gray-800
        shadow-2xl
      "
      />
    </div>
  )}

  {/* AI PREDICTION IMAGE WITH BOXES */}
  {predictionImage && (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles
          size={22}
          className="text-green-400"
        />

        <h3 className="text-xl font-bold text-white">
          AI Damage Detection
        </h3>
      </div>

      <img
        src={`${predictionImage}?t=${Date.now()}`}
        alt="prediction"
        className="
        w-full
        rounded-[30px]
        border
        border-green-500
        shadow-2xl
      "
      />
    </div>
  )}

  {/* ANALYZE BUTTON */}
  <button
    onClick={analyzeCar}
    disabled={loading}
    className={`
      w-full
      mt-8
      py-5
      rounded-2xl
      text-xl
      font-bold
      transition-all
      duration-300
      ${
        loading
          ? "bg-gray-700 cursor-not-allowed"
          : "bg-gradient-to-r from-orange-500 to-orange-600 hover:scale-[1.01]"
      }
    `}
  >
    {loading
      ? "Analyzing Vehicle..."
      : "Analyze Vehicle 🚗"}
  </button>

  {/* LOADER */}
  {loading && (
    <div className="text-center mt-10">
      <div className="w-16 h-16 border-4 border-gray-700 border-t-orange-500 rounded-full animate-spin mx-auto"></div>

      <p className="text-orange-400 mt-4">
        AI Processing Vehicle Image...
      </p>
    </div>
  )}
</>


);
}

export default UploadSection;
