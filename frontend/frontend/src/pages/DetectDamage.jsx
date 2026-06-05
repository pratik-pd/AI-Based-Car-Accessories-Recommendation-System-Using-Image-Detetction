// import UploadSection from "../components/UploadSection";
// import ResultCard from "../components/ResultCard";
// import AIReport from "../components/AIReport";

// function DetectDamage() {
//   return (
//     <div className="min-h-screen bg-black text-white pt-24">
//       <div className="max-w-7xl mx-auto px-6">

//         <h1 className="text-5xl font-bold text-center mb-4">
//           AI Car Damage Detection
//         </h1>

//         <p className="text-center text-gray-400 mb-12">
//           Upload a vehicle image and let AI identify damage instantly.
//         </p>

//         <UploadSection />

//         <div className="mt-10">
//           <ResultCard />
//         </div>

//         <div className="mt-10">
//           <AIReport />
//         </div>

//       </div>
//     </div>
//   );
// }

// export default DetectDamage;



import UploadBox from "../components/UploadBox";

function DetectDamage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <UploadBox />
    </div>
  );
}

export default DetectDamage;