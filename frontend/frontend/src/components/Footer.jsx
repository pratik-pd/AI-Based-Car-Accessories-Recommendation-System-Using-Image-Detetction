import {
  Car,
  Mail,
  Phone,
} from "lucide-react";

function Footer() {

  return (

    <footer className="bg-black border-t border-gray-800 mt-24">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-10">

          <div>

            <div className="flex items-center gap-3">

              <Car className="text-orange-500" />

              <h2 className="text-2xl font-black">
                AI Vehicle Analyzer
              </h2>

            </div>

            <p className="text-gray-400 mt-4">
              AI powered vehicle inspection platform built
              using React, Flask and YOLOv8.
            </p>

          </div>

          <div>

            <h3 className="text-xl font-bold mb-4">
              Features
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>Vehicle Detection</li>

              <li>Damage Analysis</li>

              <li>AI Reports</li>

              <li>Repair Cost Prediction</li>

            </ul>

          </div>

          <div>

            <h3 className="text-xl font-bold mb-4">
              Contact
            </h3>

            <div className="space-y-4 text-gray-400">

              <div className="flex gap-3">

                <Mail size={18} />

                <span>pratik@example.com</span>

              </div>

              <div className="flex gap-3">

                <Phone size={18} />

                <span>+91 XXXXX XXXXX</span>

              </div>

            </div>

          </div>

        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">

          © 2026 AI Vehicle Analyzer | MCA Major Project

        </div>

      </div>

    </footer>

  );
}

export default Footer;