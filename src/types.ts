export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export type TableType = "standard" | "window" | "outdoor" | "private";

export interface Booking {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guests: number;
  tableType: TableType;
  specialRequests: string;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
}

export type View = "home" | "menu" | "booking" | "dashboard" | "auth";
