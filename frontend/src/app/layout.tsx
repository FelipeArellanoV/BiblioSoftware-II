import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biblioteca Inteligente",
  description: "Inicio de sesión",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0"
          style={{
            background:
              "radial-gradient(1200px 480px at 50% -120px, rgba(59,130,246,.16), transparent), radial-gradient(900px 360px at 80% -80px, rgba(99,102,241,.14), transparent)",
          }}
        />
        <header className="relative z-10 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 grid place-items-center text-slate-900 font-bold">B</div>
              <span className="font-semibold">Biblioteca Inteligente</span>
            </div>
            <span className="rounded-full border border-slate-700/70 bg-slate-900/50 px-4 py-1.5 text-sm text-slate-300">
              Universidad
            </span>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:py-16">
          {children}
        </main>
      </body>
    </html>
  );
}
