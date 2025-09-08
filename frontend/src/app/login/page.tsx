"use client";
import { useState } from "react";
import { api } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const r = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.access_token);
      r.replace("/");
    } catch {
      setError("Correo o contraseña inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-5xl place-items-center">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800/70 bg-slate-900/70 shadow-2xl shadow-black/40">
        <div className="px-6 py-5 md:px-8 md:py-6 border-b border-slate-800/60">
          <h1 className="text-lg md:text-xl font-semibold">Iniciar sesión</h1>
        </div>

        <form onSubmit={onSubmit} className="px-6 py-6 md:px-8 md:py-8 space-y-5">
          <div className="space-y-2">
            <label className="block text-sm text-slate-300">Correo institucional</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="nombre@ucampus.cl"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-slate-300">Contraseña</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              minLength={6}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400" aria-live="assertive">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 disabled:opacity-70"
          >
            {loading ? "Ingresando…" : "Ingresar"}
          </button>

          <p className="text-sm text-slate-400">
            ¿No tienes cuenta?
            <a className="ml-1 underline hover:text-slate-200" href="/register">Regístrate</a>
          </p>
        </form>
      </div>
    </div>
  );
}
