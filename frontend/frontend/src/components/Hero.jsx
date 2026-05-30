// function Hero() {

//   return (

//     <div className="text-center mb-14">

//       <h1 className="text-6xl font-black text-white leading-tight">

//         Smart AI Vehicle
//         <span className="text-orange-500">
//           {" "}Analyzer
//         </span>

//       </h1>

//       <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto leading-relaxed">

//         Upload vehicle images and get AI powered
//         damage detection, repair cost estimation,
//         vehicle health analysis, smart insights,
//         and accessories recommendation.

//       </p>

//     </div>
//   );
// }

// export default Hero;




function Hero() {

  return (

    <div className="relative h-screen w-full overflow-hidden">

      {/* VIDEO */}

      <video
        autoPlay
        muted
        loop
        className="absolute w-full h-full object-cover"
      >

        <source
          src="/video.mp4"
          type="video/mp4"
        />

      </video>

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-black/70"></div>

      {/* CONTENT */}

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">

        <h1 className="text-6xl font-black text-white leading-tight">
          AI Vehicle Analyzer
        </h1>

        <p className="text-gray-300 text-xl mt-6 max-w-2xl">
          Upload your vehicle image and get smart AI analysis,
          health report, damage detection and recommendations.
        </p>

      </div>

    </div>
  );
}

export default Hero;

