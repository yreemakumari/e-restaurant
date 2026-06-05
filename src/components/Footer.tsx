import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="text-2xl font-bold text-amber-500">Omano Restaurant</div>
          <p className="mt-3 text-sm leading-relaxed text-stone-400 max-w-md">
            Experience the rich flavors of traditional and modern cuisine. Omano brings together family recipes, fresh local ingredients, and a warm atmosphere — an unforgettable dining experience.
          </p>
          <div className="flex gap-3 mt-5">
            {["f", "ig", "tw"].map((s, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-stone-800 hover:bg-amber-600 transition flex items-center justify-center text-white text-sm font-bold">
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-amber-500">Home</a></li>
            <li><a className="hover:text-amber-500">Menu</a></li>
            <li><a className="hover:text-amber-500">Reservations</a></li>
            <li><a className="hover:text-amber-500">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin size={16} className="text-amber-500" /><span>NH33, near Mahaveer Petrol Pump, India</span></li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-amber-500" /><span>+918812345678</span></li>
            <li className="flex items-center gap-2"><Mail size={16} className="text-amber-500" /><span>hello@omano.com</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800 py-5 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} Omano Restaurant. All rights reserved. Full-stack app built with React, Node.js, Express & MongoDB.
      </div>
    </footer>
  );
}
