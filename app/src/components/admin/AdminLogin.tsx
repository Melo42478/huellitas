"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Trigger page refresh so Server Component re-evaluates auth state
        window.location.reload();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-5">
      <div className="bg-surface border border-border rounded-card p-8 w-full max-w-sm">
        <h1 className="font-display font-extrabold text-2xl text-text mb-1">
          Panel de administrador
        </h1>
        <p className="text-text-muted text-sm mb-6">
          Inicia sesión para gestionar los perritos y donaciones.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold text-sm text-text mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full border border-border rounded-row px-3.5 py-2.5 text-base focus:outline-none focus:border-teal"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-sm text-text mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-border rounded-row px-3.5 py-2.5 text-base focus:outline-none focus:border-teal"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-row p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal text-white font-display font-extrabold py-3 rounded-pill hover:bg-teal-dark transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Iniciando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
