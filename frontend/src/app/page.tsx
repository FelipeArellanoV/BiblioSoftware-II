"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const r = useRouter();
  const [hasToken, setHasToken] = useState(false);
  useEffect(() => { setHasToken(!!localStorage.getItem("token")); }, []);
  const logout = () => { localStorage.removeItem("token"); r.replace("/login"); };

  return (
    <main className="mx-auto mt-10 max-w-3xl space-y-6">
      <h2 className="text-2xl font-semibold">Bienvenido</h2>
      {!hasToken ? (
        <a className="underline" href="/login">Iniciar sesión</a>
      ) : (
        <button onClick={logout} className="rounded-xl bg-slate-800 px-4 py-2 hover:bg-slate-700">
          Cerrar sesión
        </button>
      )}
    </main>
  );
}
