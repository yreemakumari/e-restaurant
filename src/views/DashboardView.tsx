import { useState } from "react";
import { CalendarDays, Clock, Users, Trash2, Edit, Check, X, Plus, CalendarX } from "lucide-react";
import { api } from "../mockAPI";
import { Booking, TableType, User } from "../types";

interface Props {
  user: User;
  bookings: Booking[];
  onBook: () => void;
  onUpdate: () => void;
  onDeleted: () => void;
}

const tableLabels: Record<TableType, string> = {
  standard: "Standard",
  window: "Window",
  outdoor: "Outdoor",
  private: "Private",
};

export default function DashboardView({ user, bookings, onBook, onUpdate, onDeleted }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Booking>>({});

  const startEdit = (b: Booking) => {
    setEditingId(b._id);
    setEditForm({ date: b.date, time: b.time, guests: b.guests, tableType: b.tableType });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      await api.updateBooking(editingId, editForm);
      setEditingId(null);
      onUpdate();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const cancelBooking = async (id: string) => {
    if (!confirm("Cancel this booking?")) return;
    await api.deleteBooking(id);
    onDeleted();
  };

  const upcoming = bookings.filter((b) => b.status !== "cancelled" && b.date >= new Date().toISOString().split("T")[0]);
  const past = bookings.filter((b) => b.status === "cancelled" || b.date < new Date().toISOString().split("T")[0]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-amber-700 text-sm font-semibold tracking-widest uppercase">Dashboard</span>
          <h1 className="text-3xl font-bold text-stone-900 mt-1">Welcome, {user.name}</h1>
          <p className="text-stone-500 text-sm">Manage your reservations at Omano Restaurant</p>
        </div>
        <button onClick={onBook} className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transition">
          <Plus size={18} /> New Booking
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard icon={<CalendarDays />} label="Upcoming" value={upcoming.length} color="emerald" />
        <StatCard icon={<CalendarX />} label="Past / Cancelled" value={past.length} color="stone" />
        <StatCard icon={<Users />} label="Total Guests" value={bookings.reduce((s, b) => s + b.guests, 0)} color="amber" />
      </div>

      <h2 className="text-xl font-bold text-stone-900 mb-4">Your Reservations</h2>

      {bookings.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <CalendarDays size={28} />
          </div>
          <h3 className="text-lg font-semibold text-stone-900">No bookings yet</h3>
          <p className="text-stone-500 mt-1 text-sm">Reserve a table and your bookings will appear here.</p>
          <button onClick={onBook} className="mt-5 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-lg font-semibold">
            Book a Table
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => {
            const isEditing = editingId === b._id;
            return (
              <div key={b._id} className={`bg-white border rounded-2xl p-5 sm:p-6 transition ${
                b.status === "cancelled" ? "border-stone-200 opacity-70" : "border-stone-200 hover:shadow-md"
              }`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-stone-900">{b.name}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        b.status === "confirmed" ? "bg-emerald-100 text-emerald-700" :
                        "bg-stone-200 text-stone-600"
                      }`}>
                        {b.status === "confirmed" ? "Confirmed" : b.status}
                      </span>
                      <span className="text-xs text-stone-400">#{b._id.slice(0, 8)}</span>
                    </div>

                    {isEditing ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                        <input type="date" value={editForm.date || ""} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} className="input text-sm" />
                        <input type="time" value={editForm.time || ""} onChange={(e) => setEditForm({ ...editForm, time: e.target.value })} className="input text-sm" />
                        <input type="number" min={1} max={20} value={editForm.guests || 1} onChange={(e) => setEditForm({ ...editForm, guests: parseInt(e.target.value) || 1 })} className="input text-sm" placeholder="Guests" />
                        <select value={editForm.tableType} onChange={(e) => setEditForm({ ...editForm, tableType: e.target.value as TableType })} className="input text-sm">
                          <option value="standard">Standard</option>
                          <option value="window">Window</option>
                          <option value="outdoor">Outdoor</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600">
                        <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} className="text-amber-600" /> {b.date}</span>
                        <span className="inline-flex items-center gap-1.5"><Clock size={14} className="text-amber-600" /> {b.time}</span>
                        <span className="inline-flex items-center gap-1.5"><Users size={14} className="text-amber-600" /> {b.guests} guests</span>
                        <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> {tableLabels[b.tableType]}</span>
                      </div>
                    )}

                    {b.specialRequests && !isEditing && (
                      <p className="mt-3 text-xs text-stone-500 italic bg-stone-50 rounded-lg px-3 py-2 border border-stone-100">
                        Note: {b.specialRequests}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isEditing ? (
                      <>
                        <button onClick={saveEdit} className="p-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700" title="Save">
                          <Check size={16} />
                        </button>
                        <button onClick={cancelEdit} className="p-2 rounded-md bg-stone-200 text-stone-700 hover:bg-stone-300" title="Cancel">
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        {b.status !== "cancelled" && (
                          <button onClick={() => startEdit(b)} className="p-2 rounded-md bg-amber-100 text-amber-700 hover:bg-amber-200" title="Edit">
                            <Edit size={16} />
                          </button>
                        )}
                        <button onClick={() => cancelBooking(b._id)} className="p-2 rounded-md bg-rose-100 text-rose-700 hover:bg-rose-200" title="Cancel">
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  const colors: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    stone: "bg-stone-100 text-stone-700",
  };
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-stone-900">{value}</div>
        <div className="text-sm text-stone-500">{label}</div>
      </div>
    </div>
  );
}
