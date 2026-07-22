"use client";

import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import type { Dog } from "@/lib/types";

interface DogListProps {
  dogs: Dog[];
  onDogDeleted: (id: string) => void;
  onDogUpdated: (dog: Dog) => void;
}

export default function DogList({
  dogs,
  onDogDeleted,
  onDogUpdated,
}: DogListProps) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Dog>>({});

  const handleDelete = async (id: string) => {
    if (!confirm(`¿Eliminar a ${dogs.find((d) => d.id === id)?.name}?`)) return;

    setDeleting(id);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("dogs").delete().eq("id", id);

      if (error) throw error;
      onDogDeleted(id);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al eliminar");
    } finally {
      setDeleting(null);
    }
  };

  const handleEditStart = (dog: Dog) => {
    setEditingId(dog.id);
    setEditForm(dog);
  };

  const handleEditSave = async (id: string) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("dogs")
        .update({
          name: editForm.name,
          estado: editForm.estado,
          sexo: editForm.sexo,
          edad: editForm.edad,
          tamano: editForm.tamano,
          ubicacion: editForm.ubicacion,
          vacunado: editForm.vacunado,
          esterilizado: editForm.esterilizado,
          historia: editForm.historia,
          meta: editForm.meta ? parseFloat(editForm.meta.toString()) : 0,
          recaudado: editForm.recaudado
            ? parseFloat(editForm.recaudado.toString())
            : 0,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      onDogUpdated(data);
      setEditingId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al guardar");
    }
  };

  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <h2 className="font-display font-extrabold text-2xl text-text mb-6">
        Perritos publicados ({dogs.length})
      </h2>

      {dogs.length === 0 ? (
        <div className="text-center py-8 text-text-muted">
          <p>No hay perritos publicados aún.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {dogs.map((dog) => (
            <div
              key={dog.id}
              className="border border-border rounded-row p-4 flex gap-4 items-start"
            >
              {editingId === dog.id ? (
                <>
                  <div className="flex-1 grid grid-cols-1 md2:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={editForm.name || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="border border-border rounded-row px-2.5 py-2 text-sm focus:outline-none focus:border-teal"
                      placeholder="Nombre"
                    />
                    <select
                      value={editForm.estado || "adopcion"}
                      onChange={(e) =>
                        setEditForm({ ...editForm, estado: e.target.value as any })
                      }
                      className="border border-border rounded-row px-2.5 py-2 text-sm focus:outline-none focus:border-teal"
                    >
                      <option value="adopcion">Adopción</option>
                      <option value="tratamiento">Tratamiento</option>
                      <option value="adoptado">Adoptado</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleEditSave(dog.id)}
                    className="font-bold text-sm px-4 py-2 bg-green text-white rounded-pill hover:opacity-90 cursor-pointer"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="font-bold text-sm px-4 py-2 border border-border rounded-pill hover:bg-surface cursor-pointer"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  {dog.ahora && (
                    <Image
                      src={dog.ahora}
                      alt={dog.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-row object-cover flex-shrink-0"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-extrabold text-base text-teal">
                      {dog.name} · {dog.edad}
                    </h3>
                    <p className="text-xs text-text-muted mt-1">
                      {dog.estado} • {dog.sexo} • {dog.tamano}
                    </p>
                    <p className="text-xs text-text-secondary mt-2 line-clamp-1">
                      {dog.historia}
                    </p>
                  </div>

                  <button
                    onClick={() => handleEditStart(dog)}
                    className="font-bold text-sm px-3 py-1.5 border border-border rounded-pill hover:bg-surface cursor-pointer flex-shrink-0"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(dog.id)}
                    disabled={deleting === dog.id}
                    className="font-bold text-sm px-3 py-1.5 border border-red-200 text-red-700 rounded-pill hover:bg-red-50 cursor-pointer flex-shrink-0 disabled:opacity-50"
                  >
                    {deleting === dog.id ? "..." : "Borrar"}
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
