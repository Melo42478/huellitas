"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { money } from "@/lib/helpers";
import type { Dog } from "@/lib/types";
import type { Movimiento } from "@/lib/types";

interface FinancePanelProps {
  dogs: Dog[];
  movimientos: Movimiento[];
  onMovimientoAdded: (mov: Movimiento) => void;
  onMovimientoDeleted: (id: string) => void;
}

export default function FinancePanel({
  dogs,
  movimientos,
  onMovimientoAdded,
  onMovimientoDeleted,
}: FinancePanelProps) {
  const [form, setForm] = useState({
    dog_id: "",
    tipo: "ingreso",
    concepto: "",
    monto: "",
    fecha: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const totalIngresos = movimientos
    .filter((m) => m.tipo === "ingreso")
    .reduce((sum, m) => sum + parseFloat(m.monto.toString()), 0);

  const totalGastos = movimientos
    .filter((m) => m.tipo === "gasto")
    .reduce((sum, m) => sum + parseFloat(m.monto.toString()), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!form.concepto.trim()) {
        throw new Error("El concepto es requerido");
      }

      if (!form.monto || parseFloat(form.monto) <= 0) {
        throw new Error("El monto debe ser mayor a 0");
      }

      const supabase = createClient();
      const { data, error } = await supabase
        .from("movimientos")
        .insert([
          {
            dog_id: form.dog_id || null,
            tipo: form.tipo,
            concepto: form.concepto,
            monto: parseFloat(form.monto),
            fecha: form.fecha,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      onMovimientoAdded(data);
      setForm({
        dog_id: "",
        tipo: "ingreso",
        concepto: "",
        monto: "",
        fecha: new Date().toISOString().split("T")[0],
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al registrar movimiento");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este movimiento?")) return;

    setDeleting(id);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("movimientos")
        .delete()
        .eq("id", id);

      if (error) throw error;
      onMovimientoDeleted(id);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al eliminar");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md2:grid-cols-3 gap-5">
        <div className="bg-surface border border-border rounded-card p-6">
          <div className="text-xs text-text-muted mb-1">Total de ingresos</div>
          <div className="font-display font-extrabold text-2xl text-green">
            {money(totalIngresos)}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-card p-6">
          <div className="text-xs text-text-muted mb-1">Total de gastos</div>
          <div className="font-display font-extrabold text-2xl text-red-700">
            {money(totalGastos)}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-card p-6">
          <div className="text-xs text-text-muted mb-1">Balance</div>
          <div className="font-display font-extrabold text-2xl text-teal">
            {money(totalIngresos - totalGastos)}
          </div>
        </div>
      </div>

      {/* Add movimiento form */}
      <div className="bg-surface border border-border rounded-card p-6">
        <h2 className="font-display font-extrabold text-2xl text-text mb-6">
          Registrar movimiento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md2:grid-cols-2 gap-5">
            <div>
              <label className="block font-bold text-sm text-text mb-1.5">
                Tipo
              </label>
              <select
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                className="w-full border border-border rounded-row px-3.5 py-2.5 focus:outline-none focus:border-teal"
              >
                <option value="ingreso">Ingreso</option>
                <option value="gasto">Gasto</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-sm text-text mb-1.5">
                Perrito (opcional)
              </label>
              <select
                value={form.dog_id}
                onChange={(e) => setForm({ ...form, dog_id: e.target.value })}
                className="w-full border border-border rounded-row px-3.5 py-2.5 focus:outline-none focus:border-teal"
              >
                <option value="">Donación general</option>
                {dogs.map((dog) => (
                  <option key={dog.id} value={dog.id}>
                    {dog.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-sm text-text mb-1.5">
                Concepto *
              </label>
              <input
                type="text"
                value={form.concepto}
                onChange={(e) => setForm({ ...form, concepto: e.target.value })}
                placeholder="ej: Donación, Veterinario, Alimento"
                className="w-full border border-border rounded-row px-3.5 py-2.5 focus:outline-none focus:border-teal"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-sm text-text mb-1.5">
                Monto ($) *
              </label>
              <input
                type="number"
                step="0.01"
                value={form.monto}
                onChange={(e) => setForm({ ...form, monto: e.target.value })}
                placeholder="100.00"
                className="w-full border border-border rounded-row px-3.5 py-2.5 focus:outline-none focus:border-teal"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-sm text-text mb-1.5">
                Fecha
              </label>
              <input
                type="date"
                value={form.fecha}
                onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                className="w-full border border-border rounded-row px-3.5 py-2.5 focus:outline-none focus:border-teal"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal text-white font-display font-extrabold py-3 rounded-pill hover:bg-teal-dark transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Registrando..." : "Registrar movimiento"}
          </button>
        </form>
      </div>

      {/* Movimientos list */}
      <div className="bg-surface border border-border rounded-card p-6">
        <h2 className="font-display font-extrabold text-2xl text-text mb-6">
          Movimientos recientes
        </h2>

        {movimientos.length === 0 ? (
          <div className="text-center py-8 text-text-muted">
            <p>No hay movimientos registrados.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {[...movimientos].reverse().map((mov) => {
              const dog = dogs.find((d) => d.id === mov.dog_id);
              return (
                <div
                  key={mov.id}
                  className="border border-border rounded-row p-3 flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-text">
                      {mov.concepto}
                      {dog && <span className="text-text-muted"> • {dog.name}</span>}
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      {mov.fecha}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className={`font-display font-extrabold text-base ${
                        mov.tipo === "ingreso"
                          ? "text-green"
                          : "text-red-700"
                      }`}
                    >
                      {mov.tipo === "ingreso" ? "+" : "-"}
                      {money(parseFloat(mov.monto.toString()))}
                    </div>

                    <button
                      onClick={() => handleDelete(mov.id)}
                      disabled={deleting === mov.id}
                      className="font-bold text-sm px-3 py-1.5 border border-red-200 text-red-700 rounded-pill hover:bg-red-50 cursor-pointer disabled:opacity-50 flex-shrink-0"
                    >
                      {deleting === mov.id ? "..." : "Borrar"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
