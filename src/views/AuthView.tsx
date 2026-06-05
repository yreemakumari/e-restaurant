import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { api } from "../mockAPI";
import { User as UserType } from "../types";

interface Props {
  onAuth: (u: UserType) => void;
  onError: (msg: string) => void;
}

export default function AuthView({ onAuth, onError }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setLocalError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    if (!form.email || !form.password) return;
    if (mode === "register" && !form.name) return;
    setLoading(true);
    try {
      const res = mode === "login"
        ? await api.login(form.email, form.password)
        : await api.register(form.name, form.email, form.password);
      setLoading(false);
      onAuth(res.user);
    } catch (err: any) {
      setLoading(false);
      setLocalError(err.message || "Something went wrong");
      onError(err.message || "Failed");
    }
  };

  const switchMode = () => {
    setMode((m) => (m === "login" ? "register" : "login"));
    setLocalError("");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6">
            <h1 className="text-2xl font-bold">{mode === "login" ? "Welcome Back" : "Create Account"}</h1>
            <p className="text-amber-100 text-sm mt-1">
              {mode === "login" ? "Sign in to manage your reservations" : "Join Omano and start booking tables"}
            </p>
          </div>

          <form onSubmit={submit} className="p-6 sm:p-8 space-y-4">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg px-4 py-3">{error}</div>
            )}

            {mode === "register" && (
              <Field label="Full Name">
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe" className="input pl-9" />
                </div>
              </Field>
            )}

            <Field label="Email">
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com" className="input pl-9" />
              </div>
            </Field>

            <Field label="Password">
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input type={showPw ? "text" : "password"} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••" minLength={4} className="input pl-9 pr-10" />
                <button type="button" onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            <button type="submit" disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg shadow-md transition flex items-center justify-center gap-2">
              {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
              {!loading && <ArrowRight size={16} />}
            </button>

            <div className="text-center text-sm text-stone-600 pt-2">
              {mode === "login" ? "New to Omano?" : "Already have an account?"}{" "}
              <button type="button" onClick={switchMode} className="text-amber-700 font-semibold hover:underline">
                {mode === "login" ? "Create account" : "Sign in"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-stone-400 mt-4">
          Demo app — data is stored locally in your browser
        </p>
      </div>
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
