// Mock RESTful API layer (simulates Express + MongoDB backend)
// In production, these methods would be axios/fetch calls to:
//   POST   /api/auth/register
//   POST   /api/auth/login
//   GET    /api/bookings
//   POST   /api/bookings
//   PUT    /api/bookings/:id
//   DELETE /api/bookings/:id

import { Booking, User } from "./types";

const STORAGE = {
  users: "omano_users",
  bookings: "omano_bookings",
  session: "omano_session",
};

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

const load = <T,>(key: string): T[] => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]") as T[];
  } catch {
    return [];
  }
};

const save = <T,>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

// ---------- Auth ----------
export const api = {
  async register(name: string, email: string, _password: string): Promise<{ user: User; token: string }> {
    await delay();
    const users = load<User>(STORAGE.users);
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("Email already registered");
    }
    const user: User = { _id: uid(), name, email, createdAt: new Date().toISOString() };
    users.push(user);
    save(STORAGE.users, users);
    // In real backend: password hashed with bcrypt, JWT signed
    const token = "jwt_" + uid();
    localStorage.setItem(STORAGE.session, JSON.stringify({ user, token }));
    return { user, token };
  },

  async login(email: string, _password: string): Promise<{ user: User; token: string }> {
    await delay();
    const users = load<User>(STORAGE.users);
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error("Invalid credentials");
    const token = "jwt_" + uid();
    localStorage.setItem(STORAGE.session, JSON.stringify({ user, token }));
    return { user, token };
  },

  logout() {
    localStorage.removeItem(STORAGE.session);
  },

  getSession(): { user: User; token: string } | null {
    try {
      return JSON.parse(localStorage.getItem(STORAGE.session) || "null");
    } catch {
      return null;
    }
  },

  // ---------- Bookings CRUD ----------
  async getBookings(userId: string): Promise<Booking[]> {
    await delay(200);
    return load<Booking>(STORAGE.bookings)
      .filter((b) => b.userId === userId)
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  },

  async createBooking(data: Omit<Booking, "_id" | "userId" | "status" | "createdAt"> & { userId: string }): Promise<Booking> {
    await delay();
    const bookings = load<Booking>(STORAGE.bookings);
    const booking: Booking = {
      _id: uid(),
      userId: data.userId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: data.date,
      time: data.time,
      guests: data.guests,
      tableType: data.tableType,
      specialRequests: data.specialRequests,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    bookings.push(booking);
    save(STORAGE.bookings, bookings);
    return booking;
  },

  async updateBooking(id: string, patch: Partial<Booking>): Promise<Booking> {
    await delay();
    const bookings = load<Booking>(STORAGE.bookings);
    const idx = bookings.findIndex((b) => b._id === id);
    if (idx === -1) throw new Error("Booking not found");
    bookings[idx] = { ...bookings[idx], ...patch };
    save(STORAGE.bookings, bookings);
    return bookings[idx];
  },

  async deleteBooking(id: string): Promise<void> {
    await delay();
    const bookings = load<Booking>(STORAGE.bookings).filter((b) => b._id !== id);
    save(STORAGE.bookings, bookings);
  },
};
