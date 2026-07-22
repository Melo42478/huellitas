"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import type { Dog } from "@/lib/types";

interface DogFormProps {
  onDogAdded: (dog: Dog) => void;
}

export default function DogForm({ onDogAdded }: DogFormProps) {
  const [form, setForm] = useState({
    name: "",
    estado: "adopcion",
    sexo: "Macho",
    edad: "",
    tamano: "Mediano",
    ubicacion: "Querétaro",
    vacunado: false,
    esterilizado: false,
    historia: "",
    meta: "500",
    recaudado: "0",
  });

  const [files, setFiles] = useState({
    antes: null as File | null,
    ahora: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const supabase = createClient();
    const timestamp = Date.now();
    const filename = `${folder}/${timestamp}-${file.name}`;

    const { data, error: uploadError } = await supabase.storage
      .from("dog-photos")
      .upload(filename, file);

    if (uploadError) throw new Error(`Error uploading ${folder}: ${uploadError.message}`);

    const {
      data: { publicUrl },
    } = supabase.storage.from("dog-photos").getPublicUrl(data.path);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      if (!form.name.trim()) {
        throw new Error("El nombre del perrito es requerido");
      }

      const supabase = createClient();
      let beforeUrl = "";
      let afterUrl = "";

      if (files.antes) {
        beforeUrl = await uploadFile(files.antes, "before");
      }
      if (files.ahora) {
        afterUrl = await uploadFile(files.ahora, "after");
      }

      const dogId = form.name.toLowerCase().replace(/\s+/g, "-");

      const { data, error: insertError } = await supabase
        .from("dogs")
        .insert([
          {
            id: dogId,
            name: form.name,
            estado: form.estado,
            sexo: form.sexo,
            edad: form.edad,
            tamano: form.tamano,
            ubicacion: form.ubicacion,
            vacunado: form.vacunado,
            esterilizado: form.esterilizado,
            historia: form.historia,
            meta: parseFloat(form.meta),
            recaudado: parseFloat(form.recaudado),
            antes: beforeUrl || null,
            ahora: afterUrl || null,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      onDogAdded(data);
      setForm({
        name: "",
        estado: "adopcion",
        sexo: "Macho",
        edad: "",
        tamano: "Mediano",
        ubicacion: "Querétaro",
        vacunado: false,
        esterilizado: false,
        historia: "",
        meta: "500",
        recaudado: "0",
      });
      setFiles({ antes: null, ahora: null });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear perrito");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <h2 className="font-display font-extrabold text-2xl text-text mb-6">
        Publicar nuevo perrito
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md2:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block font-bold text-sm text-text mb-1.5">
              Nombre *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Rocky"
              className="w-full border border-border rounded-row px-3.5 py-2.5 focus:outline-none focus:border-teal"
              required
            />
          </div>

          {/* Edad */}
          <div>
            <label className="block font-bold text-sm text-text mb-1.5">
              Edad
            </label>
            <input
              type="text"
              value={form.edad}
              onChange={(e) => setForm({ ...form, edad: e.target.value })}
              placeholder="2 años"
              className="w-full border border-border rounded-row px-3.5 py-2.5 focus:outline-none focus:border-teal"
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block font-bold text-sm text-text mb-1.5">
              Estado
            </label>
            <select
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
              className="w-full border border-border rounded-row px-3.5 py-2.5 focus:outline-none focus:border-teal"
            >
              <option value="adopcion">Adopción</option>
              <option value="tratamiento">Tratamiento</option>
              <option value="adoptado">Adoptado</option>
            </select>
          </div>

          {/* Sexo */}
          <div>
            <label className="block font-bold text-sm text-text mb-1.5">
              Sexo
            </label>
            <select
              value={form.sexo}
              onChange={(e) => setForm({ ...form, sexo: e.target.value })}
              className="w-full border border-border rounded-row px-3.5 py-2.5 focus:outline-none focus:border-teal"
            >
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>

          {/* Tamaño */}
          <div>
            <label className="block font-bold text-sm text-text mb-1.5">
              Tamaño
            </label>
            <select
              value={form.tamano}
              onChange={(e) => setForm({ ...form, tamano: e.target.value })}
              className="w-full border border-border rounded-row px-3.5 py-2.5 focus:outline-none focus:border-teal"
            >
              <option value="Pequeño">Pequeño</option>
              <option value="Mediano">Mediano</option>
              <option value="Grande">Grande</option>
            </select>
          </div>

          {/* Ubicación */}
          <div>
            <label className="block font-bold text-sm text-text mb-1.5">
              Ubicación
            </label>
            <input
              type="text"
              value={form.ubicacion}
              onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
              placeholder="Querétaro"
              className="w-full border border-border rounded-row px-3.5 py-2.5 focus:outline-none focus:border-teal"
            />
          </div>

          {/* Meta */}
          <div>
            <label className="block font-bold text-sm text-text mb-1.5">
              Meta de donación ($)
            </label>
            <input
              type="number"
              value={form.meta}
              onChange={(e) => setForm({ ...form, meta: e.target.value })}
              placeholder="500"
              className="w-full border border-border rounded-row px-3.5 py-2.5 focus:outline-none focus:border-teal"
            />
          </div>

          {/* Recaudado */}
          <div>
            <label className="block font-bold text-sm text-text mb-1.5">
              Recaudado ($)
            </label>
            <input
              type="number"
              value={form.recaudado}
              onChange={(e) => setForm({ ...form, recaudado: e.target.value })}
              placeholder="0"
              className="w-full border border-border rounded-row px-3.5 py-2.5 focus:outline-none focus:border-teal"
            />
          </div>

          {/* Vacunado */}
          <div className="flex items-end">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.vacunado}
                onChange={(e) => setForm({ ...form, vacunado: e.target.checked })}
                className="w-5 h-5 rounded border-border"
              />
              <span className="font-bold text-sm text-text">Vacunado</span>
            </label>
          </div>

          {/* Esterilizado */}
          <div className="flex items-end">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.esterilizado}
                onChange={(e) => setForm({ ...form, esterilizado: e.target.checked })}
                className="w-5 h-5 rounded border-border"
              />
              <span className="font-bold text-sm text-text">Esterilizado</span>
            </label>
          </div>
        </div>

        {/* Historia */}
        <div>
          <label className="block font-bold text-sm text-text mb-1.5">
            Historia
          </label>
          <textarea
            value={form.historia}
            onChange={(e) => setForm({ ...form, historia: e.target.value })}
            placeholder="Cuenta la historia del perrito..."
            rows={4}
            className="w-full border border-border rounded-row px-3.5 py-2.5 focus:outline-none focus:border-teal"
          />
        </div>

        {/* File uploads */}
        <div className="grid grid-cols-1 md2:grid-cols-2 gap-5">
          <div>
            <label className="block font-bold text-sm text-text mb-1.5">
              Foto Antes
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFiles({ ...files, antes: e.target.files?.[0] || null })
              }
              className="w-full border border-border rounded-row px-3.5 py-2.5 text-sm"
            />
            {files.antes && (
              <p className="text-xs text-text-muted mt-1">
                {files.antes.name}
              </p>
            )}
          </div>

          <div>
            <label className="block font-bold text-sm text-text mb-1.5">
              Foto Ahora
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFiles({ ...files, ahora: e.target.files?.[0] || null })
              }
              className="w-full border border-border rounded-row px-3.5 py-2.5 text-sm"
            />
            {files.ahora && (
              <p className="text-xs text-text-muted mt-1">
                {files.ahora.name}
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-row p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-row p-3 text-sm text-green-700">
            ✓ Perrito publicado exitosamente
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal text-white font-display font-extrabold py-3 rounded-pill hover:bg-teal-dark transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Publicando..." : "Publicar perrito"}
        </button>
      </form>
    </div>
  );
}
