import { CalendarDays, UtensilsCrossed, Clock, Star, MapPin, Users } from "lucide-react";

interface Props {
  onBook: () => void;
  onMenu: () => void;
}

export default function HomeView({ onBook, onMenu }: Props) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900" />
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1514933651420-5d02b2?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <span className="inline-block text-amber-400 text-sm tracking-widest uppercase font-semibold">
              ★ Authentic Dining
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-3 leading-tight">
              Taste the Soul of <span className="text-amber-500">Omano</span>
            </h1>
            <p className="mt-5 text-stone-200 text-lg max-w-xl leading-relaxed">
              Handcrafted meals, warm hospitality and a memorable atmosphere. Book your table in just a few clicks and let us take care of the rest.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onBook}
                className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-7 py-3 rounded-lg font-semibold shadow-xl shadow-amber-900/40 transition">
                <CalendarDays size={18} /> Reserve a Table
              </button>
              <button
                onClick={onMenu}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/30 px-7 py-3 rounded-lg font-semibold transition">
                <UtensilsCrossed size={18} /> Explore Menu
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 max-w-lg gap-6">
              {[
                { v: "15+", l: "Years" },
                { v: "4.9", l: "Rating" },
                { v: "50K+", l: "Guests" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-bold text-amber-500">{s.v}</div>
                  <div className="text-xs text-stone-300 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-stone-900">Why Choose Omano</h2>
          <p className="text-stone-500 mt-2">An experience you'll love to repeat.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Users, title: "Warm Hospitality", desc: "Friendly staff treating you like family from the moment you step in." },
            { icon: Clock, title: "Fresh Ingredients", desc: "Locally sourced, seasonal ingredients prepared daily by our chefs." },
            { icon: Star, title: "Cozy Ambiance", desc: "A beautifully designed space perfect for any occasion." },
          ].map((f, i) => (
            <div key={i} className="bg-white p-7 rounded-xl border border-stone-200 shadow-sm hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <f.icon size={22} />
              </div>
              <h3 className="text-lg font-semibold text-stone-900">{f.title}</h3>
              <p className="mt-2 text-stone-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-3xl font-bold text-white">Ready for an unforgettable meal?</h2>
          <p className="text-amber-50 mt-3">Book your table now and skip the wait.</p>
          <button onClick={onBook} className="mt-6 inline-flex items-center gap-2 bg-white text-amber-700 hover:bg-stone-100 px-8 py-3 rounded-lg font-semibold shadow-lg transition">
            <MapPin size={18} /> Book Your Table
          </button>
        </div>
      </section>
    </div>
  );
}
