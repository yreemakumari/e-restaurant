import { useState } from "react";
import { Calendar, Clock, Users, MessageSquareText, Check } from "lucide-react";
import { api } from "../mockAPI";
import { Booking, TableType, User } from "../types";

interface Props {
  user: User;
  onCreate: (b: Booking) => void;
}

const times = ["12:00", "13:00", "14:00", "18:00", "19:00", "20:00", "21:00"];
const tableOptions: { key: TableType; label: string; desc: string }[] = [
  { key: "standard", label: "Standard", desc: "2-4 guests" },
  { key: "window", label: "Window", desc: "With a view" },
  { key: "outdoor", label: "Outdoor", desc: "Al fresco dining" },
  { key: "private", label: "Private", desc: "For 6+ guests" },
];

const today = new Date().toISOString().split("T")[0];

export default function BookingView({ user, onCreate }: Props) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: "",
    date: today,
    time: "19:00",
    guests: 2,
    tableType: "standard" as TableType,
    specialRequests: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (k: string, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.phone) return setError("Phone number is required");
    if (form.guests < 1) return setError("At least 1 guest required");
    setSubmitting(true);
    try {
      const b = await api.createBooking({
        ...form,
        userId: user._id,
      });
      setSubmitting(false);
      onCreate(b);
    } catch (err: any) {
      setSubmitting(false);
      setError(err.message || "Failed to book");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <span className="text-amber-700 text-sm font-semibold tracking-widest uppercase">Reserve</span>
        <h1 className="text-4xl font-bold text-stone-900 mt-2">Book Your Table</h1>
        <p className="text-stone-500 mt-2">Fill the details below and we'll confirm your reservation.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sm:p-8 space-y-6">
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg px-4 py-3">{error}</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Full Name">
            <input required value={form.name} onChange={(e) => update("name", e.target.value)}
              className="input" />
          </Field>
          <Field label="Email">
            <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
              className="input" />
          </Field>
          <Field label="Phone">
            <input required value={form.phone} onChange={(e) => update("phone", e.target.value)}
              placeholder="+968 1234 5678"
              className="input" />
          </Field>
          <Field label="Guests">
            <div className="relative">
              <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input type="number" min={1} max={20} value={form.guests}
                onChange={(e) => update("guests", parseInt(e.target.value) || 1)}
                className="input pl-9" />
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Date">
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input required type="date" min={today} value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className="input pl-9" />
            </div>
          </Field>
          <Field label="Time">
            <div className="relative">
              <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <select value={form.time} onChange={(e) => update("time", e.target.value)}
                className="input pl-9 appearance-none">
                {times.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </Field>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Table Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {tableOptions.map((t) => (
              <button
                type="button"
                key={t.key}
                onClick={() => update("tableType", t.key)}
                className={`p-3 rounded-lg border-2 text-left transition ${
                  form.tableType === t.key
                    ? "border-amber-600 bg-amber-50"
                    : "border-stone-200 hover:border-stone-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900 text-sm">{t.label}</span>
                  {form.tableType === t.key && <Check size={16} className="text-amber-700" />}
                </div>
                <span className="text-xs text-stone-500 mt-1 block">{t.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <Field label="Special Requests (optional)">
          <div className="relative">
            <MessageSquareText size={16} className="absolute left-3 top-3 text-stone-400" />
            <textarea rows={3} value={form.specialRequests} onChange={(e) => update("specialRequests", e.target.value)}
              placeholder="Allergies, birthday, window seat..."
              className="input pl-9 pt-3 resize-none" />
          </div>
        </Field>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-lg shadow-md transition flex items-center justify-center gap-2"
        >
          {submitting ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
