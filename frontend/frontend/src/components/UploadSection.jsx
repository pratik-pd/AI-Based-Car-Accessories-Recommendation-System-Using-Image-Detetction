import { Upload, Sparkles } from "lucide-react";

function UploadSection({
  handleImage,
  preview,
  analyzeCar,
  loading,
}) {

  return (
    <>
      <div className="text-center">

        <div className="flex justify-center items-center gap-3">

          <Sparkles className="text-orange-500" size={34} />

          <h1 className="text-4xl font-black text-white">
            AI Vehicle Analyzer
          </h1>

        </div>

      </div>

      <div className="mt-10">

        <label className="border-2 border-dashed border-orange-500 rounded-[30px] p-10 flex flex-col justify-center items-center cursor-pointer">

          <Upload
            className="text-orange-500 mb-4"
            size={55}
          />

          <h3 className="text-2xl font-bold text-white">
            Upload Vehicle Image
          </h3>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />

        </label>

      </div>

      {preview && (

        <div className="mt-10">

          <img
            src={preview}
            alt="preview"
            className="w-full max-h-[500px] object-cover rounded-[30px]"
          />

        </div>
      )}

      <button
        onClick={analyzeCar}
        className="w-full mt-8 bg-orange-500 hover:bg-orange-600 py-4 rounded-2xl text-xl font-bold"
      >
        Analyze Vehicle 🚗
      </button>

      {loading && (

        <div className="text-center mt-10">

          <div className="w-16 h-16 border-4 border-gray-700 border-t-orange-500 rounded-full animate-spin mx-auto"></div>

        </div>
      )}
    </>
  );
}

export default UploadSection;