import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Rahul Sharma",
    role: "Car Enthusiast",
    avatar: "RS",
    review: "Amazing AI analyzer! The vehicle damage detection is incredibly accurate. Got my repair estimate within seconds — saved me a trip to the mechanic.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Fleet Manager",
    avatar: "PP",
    review: "The damage detection and AI report look futuristic. Managing our vehicle fleet has never been easier — damage reports are now automated.",
    rating: 5,
  },
  {
    name: "Aman Verma",
    role: "Auto Dealer",
    avatar: "AV",
    review: "Best AI inspection tool I've used. The YOLOv8 detection is spot on and the accessory recommendations are genuinely useful for my customers.",
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">

      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#090909] to-[#050505]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-orange-500/4 blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 badge-orange mb-5">
            <Star size={13} className="fill-orange-400" />
            <span>User Reviews</span>
          </div>
          <h2 className="text-5xl font-black text-white">
            What Users{" "}
            <span className="gradient-text-orange">Say</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Trusted by vehicle enthusiasts, fleet managers, and auto dealers across India.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="card-premium p-8 border border-white/6 relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* QUOTE ICON */}
              <Quote className="text-orange-500/30 mb-4 absolute top-6 right-6" size={32} />

              {/* STARS */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* REVIEW TEXT */}
              <p className="text-gray-300 leading-relaxed text-sm mb-8">
                "{item.review}"
              </p>

              {/* AUTHOR */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/8">
                <div className="w-11 h-11 rounded-xl glass-orange flex items-center justify-center text-orange-400 font-black text-sm">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="text-white font-bold">{item.name}</h4>
                  <p className="text-gray-500 text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
