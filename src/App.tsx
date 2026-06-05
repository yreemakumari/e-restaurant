import { useEffect, useState } from "react";
import { api } from "./mockAPI";
import { Booking, User, View } from "./types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeView from "./views/HomeView";
import MenuView from "./views/MenuView";
import BookingView from "./views/BookingView";
import DashboardView from "./views/DashboardView";
import AuthView from "./views/AuthView";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const session = api.getSession();
    if (session) setUser(session.user);
  }, []);

  useEffect(() => {
    if (user) {
      api.getBookings(user._id).then(setBookings);
    } else {
      setBookings([]);
    }
  }, [user]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (u: User) => {
    setUser(u);
    setView("dashboard");
    showToast(`Welcome back, ${u.name}!`);
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
    setView("home");
    showToast("You have been logged out");
  };

  const refreshBookings = () => {
    if (user) api.getBookings(user._id).then(setBookings);
  };

  const goToBooking = () => {
    if (!user) {
      setView("auth");
      showToast("Please sign in to book a table", "error");
    } else {
      setView("booking");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800 font-sans">
      <Navbar view={view} setView={setView} user={user} onLogout={handleLogout} onBook={goToBooking} />

      <main className="flex-1">
        {view === "home" && <HomeView onBook={goToBooking} onMenu={() => setView("menu")} />}
        {view === "menu" && <MenuView />}
        {view === "booking" && user && (
          <BookingView
            user={user}
            onCreate={(b) => {
              refreshBookings();
              showToast(`Table booked for ${b.date} at ${b.time}!`);
              setView("dashboard");
            }}
          />
        )}
        {view === "booking" && !user && (
          <AuthView onAuth={handleLogin} onError={(m) => showToast(m, "error")} />
        )}
        {view === "dashboard" && user && (
          <DashboardView
            user={user}
            bookings={bookings}
            onBook={() => setView("booking")}
            onUpdate={refreshBookings}
            onDeleted={() => {
              refreshBookings();
              showToast("Booking cancelled");
            }}
          />
        )}
        {view === "dashboard" && !user && (
          <AuthView onAuth={handleLogin} onError={(m) => showToast(m, "error")} />
        )}
        {view === "auth" && (
          <AuthView onAuth={handleLogin} onError={(m) => showToast(m, "error")} />
        )}
      </main>

      <Footer />

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-lg shadow-xl text-white font-medium animate-fade-in ${
            toast.type === "success" ? "bg-emerald-600" : "bg-rose-600"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
