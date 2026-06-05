import {
  Cpu,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";

function Features() {

  const features = [

    {
      icon: <Cpu size={40} />,
      title: "AI Vehicle Detection",
      desc: "Advanced YOLOv8 powered vehicle recognition with real-time object detection."
    },

    {
      icon: <ShieldCheck size={40} />,
      title: "Damage Assessment",
      desc: "Analyze dents, scratches and external damage with intelligent AI reports."
    },

    {
      icon: <Wrench size={40} />,
      title: "Repair Estimation",
      desc: "Get repair recommendations, maintenance tips and replacement suggestions."
    },

    {
      icon: <Zap size={40} />,
      title: "Instant Results",
      desc: "Generate complete vehicle health reports within seconds."
    }

  ];

  return (

    <section className="py-28 px-6 bg-gradient-to-b from-black to-[#0d0d0d]">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-center text-5xl font-black mb-4">
          Why Choose Us
        </h1>

        <p className="text-center text-gray-400 max-w-2xl mx-auto">
          Next generation AI powered vehicle inspection platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {features.map((item, index) => (

            <div
              key={index}
              className="group bg-[#111111] border border-gray-800 p-8 rounded-3xl hover:border-orange-500 hover:-translate-y-3 transition-all duration-500"
            >

              <div className="text-orange-500 mb-6">
                {item.icon}
              </div>

              <h2 className="text-2xl font-bold">
                {item.title}
              </h2>

              <p className="text-gray-400 mt-4 leading-relaxed">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;