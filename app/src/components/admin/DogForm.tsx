"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import type { Dog } from "@/lib/types";
import ImageEditor from "./ImageEditor";

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
    whatsapp: "",
    vacunado: false,
    esterilizado: false,
    historia: "",
  });

  const [formImages, setFormImages] = useState({
    antes: "" as string,
    ahora: "" as string,
    portada: "" as string,
  });

  const [files, setFiles] = useState({
    antes: null as File | null,
    ahora: null as File | null,
    portada: null as File | null,
    gallery: [] as File[],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [editingImageType, setEditingImageType] = useState<"antes" | "ahora" | "portada" | null>(null);
  const [imageEditorUrl, setImageEditorUrl] = useState("");

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

  const canvasToFile = async (canvas: HTMLCanvasElement, filename: string): Promise<File> => {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const file = new File([blob!], filename, { type: "image/jpeg" });
        resolve(file);
      }, "image/jpeg", 0.95);
    });
  };

  const handleFileSelect = (selectedFile: File | undefined, type: "antes" | "ahora" | "portada") => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageEditorUrl(e.target?.result as string);
      setEditingImageType(type);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleImageSave = async (canvas: HTMLCanvasElement) => {
    const file = await canvasToFile(canvas, "edited.jpg");
    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);

    if (editingImageType === "antes") {
      setFiles({ ...files, antes: file });
      setFormImages({ ...formImages, antes: dataUrl });
    } else if (editingImageType === "ahora") {
      setFiles({ ...files, ahora: file });
      setFormImages({ ...formImages, ahora: dataUrl });
    } else if (editingImageType === "portada") {
      setFiles({ ...files, portada: file });
      setFormImages({ ...formImages, portada: dataUrl });
    }

    setEditingImageType(null);
    setImageEditorUrl("");
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
      let portadaUrl = "";
      const galleryUrls: string[] = [];

      if (files.antes) {
        beforeUrl = await uploadFile(files.antes, "before");
      }
      if (files.ahora) {
        afterUrl = await uploadFile(files.ahora, "after");
      }
      if (files.portada) {
        portadaUrl = await uploadFile(files.portada, "portada");
      }
      for (const file of files.gallery) {
        const url = await uploadFile(file, "gallery");
        galleryUrls.push(url);
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
            whatsapp: form.whatsapp || null,
            vacunado: form.vacunado,
            esterilizado: form.esterilizado,
            historia: form.historia,
            antes: beforeUrl || null,
            ahora: afterUrl || null,
            portada: portadaUrl || afterUrl || beforeUrl || (galleryUrls.length > 0 ? galleryUrls[0] : null),
            gallery: galleryUrls,
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
        whatsapp: "",
        vacunado: false,
        esterilizado: false,
        historia: "",
      });
      setFormImages({ antes: "", ahora: "", portada: "" });
      setFiles({ antes: null, ahora: null, portada: null, gallery: [] });
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

          {/* WhatsApp */}
          <div>
            <label className="block font-bold text-sm text-text mb-1.5">
              WhatsApp
            </label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              placeholder="5526591490"
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

        {/* Image uploads with editor */}
        <div className="grid grid-cols-1 md2:grid-cols-3 gap-5">
          {/* Foto Antes */}
          <div>
            <label className="block font-bold text-sm text-text mb-2">Foto Antes</label>
            <div className="relative w-full aspect-square bg-black/5 rounded-row border-2 border-dashed border-border group mb-2">
              {formImages.antes ? (
                <>
                  <img src={formImages.antes} alt="antes" className="w-full h-full object-contain p-2" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity rounded-row pointer-events-none group-hover:pointer-events-auto">
                    <button type="button" onClick={() => { setFormImages({ ...formImages, antes: "" }); setFiles({ ...files, antes: null }); }} className="px-2 py-1 text-xs bg-red-500 text-white rounded-pill cursor-pointer hover:bg-red-600">✕</button>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-text-muted text-xs">Sin foto</div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files?.[0], "antes")}
              className="w-full border border-border rounded-row px-2.5 py-1.5 text-xs"
            />
          </div>

          {/* Foto Ahora */}
          <div>
            <label className="block font-bold text-sm text-text mb-2">Foto Ahora</label>
            <div className="relative w-full aspect-square bg-black/5 rounded-row border-2 border-dashed border-border group mb-2">
              {formImages.ahora ? (
                <>
                  <img src={formImages.ahora} alt="ahora" className="w-full h-full object-contain p-2" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity rounded-row pointer-events-none group-hover:pointer-events-auto">
                    <button type="button" onClick={() => { setFormImages({ ...formImages, ahora: "" }); setFiles({ ...files, ahora: null }); }} className="px-2 py-1 text-xs bg-red-500 text-white rounded-pill cursor-pointer hover:bg-red-600">✕</button>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-text-muted text-xs">Sin foto</div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files?.[0], "ahora")}
              className="w-full border border-border rounded-row px-2.5 py-1.5 text-xs"
            />
          </div>

          {/* Foto Portada */}
          <div>
            <label className="block font-bold text-sm text-text mb-2">Foto Portada</label>
            <div className="relative w-full aspect-square bg-black/5 rounded-row border-2 border-dashed border-teal group mb-2">
              {formImages.portada ? (
                <>
                  <img src={formImages.portada} alt="portada" className="w-full h-full object-contain p-2" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity rounded-row pointer-events-none group-hover:pointer-events-auto">
                    <button type="button" onClick={() => { setFormImages({ ...formImages, portada: "" }); setFiles({ ...files, portada: null }); }} className="px-2 py-1 text-xs bg-red-500 text-white rounded-pill cursor-pointer hover:bg-red-600">✕</button>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-text-muted text-xs text-center px-2">Subir portada</div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files?.[0], "portada")}
              className="w-full border border-border rounded-row px-2.5 py-1.5 text-xs"
            />
          </div>
        </div>

        {/* Galería */}
        <div>
          <label className="block font-bold text-sm text-text mb-1.5">
            Fotos de galería (múltiples)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setFiles({ ...files, gallery: Array.from(e.target.files || []) })
            }
            className="w-full border border-border rounded-row px-3.5 py-2.5 text-sm"
          />
          {files.gallery.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-text-muted mb-2">
                {files.gallery.length} foto(s) seleccionada(s):
              </p>
              <div className="flex flex-wrap gap-2">
                {files.gallery.map((file, idx) => (
                  <div key={idx} className="text-xs bg-teal-soft text-teal-dark px-2.5 py-1.5 rounded-pill">
                    {file.name}
                  </div>
                ))}
              </div>
            </div>
          )}
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

      {/* Image editor modal */}
      {editingImageType !== null && imageEditorUrl && (
        <ImageEditor
          imageUrl={imageEditorUrl}
          onSave={handleImageSave}
          onCancel={() => {
            setEditingImageType(null);
            setImageEditorUrl("");
          }}
        />
      )}
    </div>
  );
}
