import { useState } from "react";
import { Utensils, Menu, X, User, LogOut, CalendarDays } from "lucide-react";
import { User as UserType, View } from "../types";

interface Props {
  view: View;
  setView: (v: View) => void;
  user: UserType | null;
  onLogout: () => void;
  onBook: () => void;
}

const links: { label: string; key: View }[] = [
  { label: "Home", key: "home" },
  { label: "Menu", key: "menu" },
  { label: "Booking", key: "booking" },
  { label: "My Bookings", key: "dashboard" },
];

export default function Navbar({ view, setView, user, onLogout, onBook }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setView("home")} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md">
              <Utensils size={18} />
            </div>
            <div className="text-left leading-tight">
              <div className="text-lg font-bold text-stone-900 group-hover:text-amber-700 transition">Omano</div>
              <div className="text-[10px] tracking-widest text-stone-500 uppercase">Restaurant</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.key}
                onClick={() => setView(l.key)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                  view === l.key ? "text-amber-700 bg-amber-50" : "text-stone-700 hover:text-amber-700 hover:bg-stone-100"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-full">
                  <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-stone-700 max-w-[120px] truncate">{user.name}</span>
                </div>
                <button onClick={onBook} className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-sm transition">
                  <CalendarDays size={16} /> Book Table
                </button>
                <button onClick={onLogout} title="Logout" className="p-2 text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-md transition">
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setView("auth")}
                className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-sm transition"
              >
                <User size={16} /> Sign In
              </button>
            )}
          </div>

          <button className="md:hidden p-2 text-stone-700" onClick={() => setOpen((o) => !o)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 border-t border-stone-200 pt-3 space-y-1">
            {links.map((l) => (
              <button
                key={l.key}
                onClick={() => {
                  setView(l.key);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                  view === l.key ? "text-amber-700 bg-amber-50" : "text-stone-700 hover:bg-stone-100"
                }`}
              >
                {l.label}
              </button>
            ))}
            <div className="pt-2 border-t border-stone-200 mt-2 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 bg-stone-100 rounded-md text-sm">
                    <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-stone-700">{user.name}</span>
                  </div>
                  <button onClick={() => { onBook(); setOpen(false); }} className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-semibold">Book Table</button>
                  <button onClick={() => { onLogout(); setOpen(false); }} className="text-rose-600 px-4 py-2 rounded-md text-sm font-medium">Logout</button>
                </>
              ) : (
                <button onClick={() => { setView("auth"); setOpen(false); }} className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-semibold">Sign In</button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
