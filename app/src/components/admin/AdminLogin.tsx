"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error((await response.json()).message || "Login failed");
      }

      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-card p-8 max-w-sm w-full">
        <h1 className="font-display font-extrabold text-3xl text-text mb-2">
          🐾 Huellitas Admin
        </h1>
        <p className="text-text-muted text-sm mb-6">Acceso administrativo</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold text-sm text-text mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@huellitas.com"
              className="w-full border border-border rounded-row px-3.5 py-2.5 focus:outline-none focus:border-teal"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-sm text-text mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-border rounded-row px-3.5 py-2.5 focus:outline-none focus:border-teal"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-text-muted hover:text-text text-sm"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-row p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal text-white font-bold py-2.5 rounded-pill hover:bg-teal-dark transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
