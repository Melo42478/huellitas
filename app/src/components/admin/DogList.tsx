"use client";

import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import type { Dog } from "@/lib/types";
import ImageEditor from "./ImageEditor";

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
  const [uploading, setUploading] = useState(false);
  const [editingImageType, setEditingImageType] = useState<"antes" | "ahora" | "portada" | null>(null);
  const [imageEditorUrl, setImageEditorUrl] = useState("");
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [portadaFile, setPortadaFile] = useState<File | null>(null);

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

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const supabase = createClient();
    const timestamp = Date.now();
    const filename = `${folder}/${timestamp}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("dog-photos")
      .upload(filename, file, { upsert: true });

    if (error) throw new Error(`Error uploading: ${error.message}`);

    const { data: publicUrlData } = supabase.storage
      .from("dog-photos")
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  };

  const handleEditStart = (dog: Dog) => {
    console.log("Opening edit for:", dog.name);
    console.log("  antes:", dog.antes ? dog.antes.substring(0, 60) : "NULL");
    console.log("  ahora:", dog.ahora ? dog.ahora.substring(0, 60) : "NULL");
    console.log("  portada:", dog.portada ? dog.portada.substring(0, 60) : "NULL");
    setEditingId(dog.id);
    setEditForm(dog);
    setBeforeFile(null);
    setAfterFile(null);
    setPortadaFile(null);
  };

  const handleFileSelect = (file: File, type: "antes" | "ahora" | "portada") => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageEditorUrl(e.target?.result as string);
      setEditingImageType(type);
    };
    reader.readAsDataURL(file);
  };

  const canvasToFile = async (canvas: HTMLCanvasElement, filename: string): Promise<File> => {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const file = new File([blob!], filename, { type: "image/jpeg" });
        resolve(file);
      }, "image/jpeg", 0.95);
    });
  };

  const handleImageSave = async (canvas: HTMLCanvasElement) => {
    const file = await canvasToFile(canvas, "edited.jpg");
    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);

    console.log("handleImageSave - type:", editingImageType, "dataUrl length:", dataUrl.length);

    if (editingImageType === "antes") {
      console.log("Saving before image");
      setBeforeFile(file);
      setEditForm(prev => {
        const updated = { ...prev, antes: dataUrl };
        console.log("Updated editForm.antes:", updated.antes?.substring(0, 50));
        return updated;
      });
    } else if (editingImageType === "ahora") {
      console.log("Saving after image");
      setAfterFile(file);
      setEditForm(prev => {
        const updated = { ...prev, ahora: dataUrl };
        console.log("Updated editForm.ahora:", updated.ahora?.substring(0, 50));
        return updated;
      });
    } else if (editingImageType === "portada") {
      console.log("Saving cover image");
      setPortadaFile(file);
      setEditForm(prev => {
        const updated = { ...prev, portada: dataUrl };
        console.log("Updated editForm.portada:", updated.portada?.substring(0, 50));
        return updated;
      });
    }

    setEditingImageType(null);
    setImageEditorUrl("");
  };

  const handleEditSave = async (id: string) => {
    console.log("=== GUARDANDO PERRO ===", id);
    try {
      setUploading(true);
      const supabase = createClient();
      const originalDog = dogs.find(d => d.id === id);
      console.log("Original dog found:", originalDog?.name, "antes:", originalDog?.antes?.substring(0, 50), "ahora:", originalDog?.ahora?.substring(0, 50));

      // Start with original URLs, only override if new file was uploaded
      let beforeUrl = originalDog?.antes;
      let afterUrl = originalDog?.ahora;
      let portadaUrl = originalDog?.portada;

      console.log("Files to upload - before:", !!beforeFile, "after:", !!afterFile, "portada:", !!portadaFile);

      if (beforeFile) {
        console.log("Uploading before file...");
        beforeUrl = await uploadFile(beforeFile, "before");
        console.log("Before URL:", beforeUrl?.substring(0, 50));
      }
      if (afterFile) {
        console.log("Uploading after file...");
        afterUrl = await uploadFile(afterFile, "after");
        console.log("After URL:", afterUrl?.substring(0, 50));
      }
      if (portadaFile) {
        console.log("⚠️ Uploading portada file - name:", portadaFile.name, "size:", portadaFile.size, "type:", portadaFile.type);
        portadaUrl = await uploadFile(portadaFile, "portada");
        console.log("✓ Portada URL saved:", portadaUrl?.substring(0, 80));
      } else {
        console.log("❌ No portada file to upload, keeping original:", portadaUrl?.substring(0, 80));
      }

      const { data, error } = await supabase
        .from("dogs")
        .update({
          name: editForm.name,
          estado: editForm.estado,
          sexo: editForm.sexo,
          edad: editForm.edad,
          tamano: editForm.tamano,
          ubicacion: editForm.ubicacion,
          whatsapp: editForm.whatsapp || null,
          vacunado: editForm.vacunado,
          esterilizado: editForm.esterilizado,
          historia: editForm.historia,
          antes: beforeUrl || null,
          ahora: afterUrl || null,
          portada: portadaUrl || null,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      console.log("✓ Perro guardado exitosamente", data.name);
      console.log("  antes:", data.antes ? data.antes.substring(0, 60) : "NULL");
      console.log("  ahora:", data.ahora ? data.ahora.substring(0, 60) : "NULL");
      console.log("  portada:", data.portada ? data.portada.substring(0, 60) : "NULL");
      onDogUpdated(data);
      setEditingId(null);
      setBeforeFile(null);
      setAfterFile(null);
      setPortadaFile(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setUploading(false);
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
            <div key={dog.id} className={`border border-border rounded-row p-4 ${editingId === dog.id ? "flex flex-col" : "flex gap-4 items-start"}`}>
              {editingId === dog.id ? (
                <div className="w-full space-y-4">
                  <div className="grid grid-cols-1 md2:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={editForm.name || ""}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="border border-border rounded-row px-2.5 py-2 text-sm focus:outline-none focus:border-teal"
                      placeholder="Nombre"
                    />
                    <input
                      type="text"
                      value={editForm.edad || ""}
                      onChange={(e) => setEditForm({ ...editForm, edad: e.target.value })}
                      className="border border-border rounded-row px-2.5 py-2 text-sm focus:outline-none focus:border-teal"
                      placeholder="Edad"
                    />
                    <select
                      value={editForm.estado || "adopcion"}
                      onChange={(e) => setEditForm({ ...editForm, estado: e.target.value as any })}
                      className="border border-border rounded-row px-2.5 py-2 text-sm focus:outline-none focus:border-teal"
                    >
                      <option value="adopcion">Adopción</option>
                      <option value="tratamiento">Tratamiento</option>
                      <option value="adoptado">Adoptado</option>
                    </select>
                    <select
                      value={editForm.sexo || "Macho"}
                      onChange={(e) => setEditForm({ ...editForm, sexo: e.target.value as "Macho" | "Hembra" })}
                      className="border border-border rounded-row px-2.5 py-2 text-sm focus:outline-none focus:border-teal"
                    >
                      <option value="Macho">Macho</option>
                      <option value="Hembra">Hembra</option>
                    </select>
                    <select
                      value={editForm.tamano || "Mediano"}
                      onChange={(e) => setEditForm({ ...editForm, tamano: e.target.value as "Pequeño" | "Mediano" | "Grande" })}
                      className="border border-border rounded-row px-2.5 py-2 text-sm focus:outline-none focus:border-teal"
                    >
                      <option value="Pequeño">Pequeño</option>
                      <option value="Mediano">Mediano</option>
                      <option value="Grande">Grande</option>
                    </select>
                    <input
                      type="text"
                      value={editForm.ubicacion || ""}
                      onChange={(e) => setEditForm({ ...editForm, ubicacion: e.target.value })}
                      className="border border-border rounded-row px-2.5 py-2 text-sm focus:outline-none focus:border-teal"
                      placeholder="Ubicación"
                    />
                    <input
                      type="text"
                      value={editForm.whatsapp || ""}
                      onChange={(e) => setEditForm({ ...editForm, whatsapp: e.target.value })}
                      className="border border-border rounded-row px-2.5 py-2 text-sm focus:outline-none focus:border-teal"
                      placeholder="WhatsApp (ej: 5526591490)"
                    />
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editForm.vacunado || false}
                        onChange={(e) => setEditForm({ ...editForm, vacunado: e.target.checked })}
                        className="w-4 h-4 rounded border-border"
                      />
                      <span className="text-sm font-bold text-text">Vacunado</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editForm.esterilizado || false}
                        onChange={(e) => setEditForm({ ...editForm, esterilizado: e.target.checked })}
                        className="w-4 h-4 rounded border-border"
                      />
                      <span className="text-sm font-bold text-text">Esterilizado</span>
                    </label>
                  </div>

                  <textarea
                    value={editForm.historia || ""}
                    onChange={(e) => setEditForm({ ...editForm, historia: e.target.value })}
                    placeholder="Historia..."
                    rows={3}
                    className="w-full border border-border rounded-row px-2.5 py-2 text-sm focus:outline-none focus:border-teal"
                  />

                  <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                    {/* Foto Antes */}
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-text-muted mb-2">Antes</div>
                      <div className="relative w-full aspect-square bg-black/5 rounded-row border-2 border-dashed border-border group">
                        {editForm.antes ? (
                          <>
                            <img src={editForm.antes} alt="antes" className="w-full h-full object-contain p-2" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity rounded-row pointer-events-none group-hover:pointer-events-auto">
                              <button type="button" onClick={() => { setEditingImageType("antes"); setImageEditorUrl(editForm.antes || ""); }} className="px-2 py-1 text-xs bg-teal text-white rounded-pill cursor-pointer hover:bg-teal-dark">✎</button>
                              <button type="button" onClick={() => { setBeforeFile(null); setEditForm({ ...editForm, antes: null }); }} className="px-2 py-1 text-xs bg-red-500 text-white rounded-pill cursor-pointer hover:bg-red-600">✕</button>
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-text-muted text-xs">Sin foto</div>
                        )}
                      </div>
                      <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f, "antes"); }} className="w-full border border-border rounded-row px-2.5 py-1.5 text-xs mt-2" />
                    </div>

                    {/* Foto Ahora */}
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-text-muted mb-2">Ahora</div>
                      <div className="relative w-full aspect-square bg-black/5 rounded-row border-2 border-dashed border-border group">
                        {editForm.ahora ? (
                          <>
                            <img src={editForm.ahora} alt="ahora" className="w-full h-full object-contain p-2" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity rounded-row pointer-events-none group-hover:pointer-events-auto">
                              <button type="button" onClick={() => { setEditingImageType("ahora"); setImageEditorUrl(editForm.ahora || ""); }} className="px-2 py-1 text-xs bg-teal text-white rounded-pill cursor-pointer hover:bg-teal-dark">✎</button>
                              <button type="button" onClick={() => { setAfterFile(null); setEditForm({ ...editForm, ahora: null }); }} className="px-2 py-1 text-xs bg-red-500 text-white rounded-pill cursor-pointer hover:bg-red-600">✕</button>
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-text-muted text-xs">Sin foto</div>
                        )}
                      </div>
                      <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f, "ahora"); }} className="w-full border border-border rounded-row px-2.5 py-1.5 text-xs mt-2" />
                    </div>

                    {/* Portada */}
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-text-muted mb-2">Portada</div>
                      <div className="relative w-full aspect-square bg-black/5 rounded-row border-2 border-dashed border-teal group">
                        {editForm.portada ? (
                          <>
                            <img src={editForm.portada} alt="portada" className="w-full h-full object-contain p-2" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity rounded-row pointer-events-none group-hover:pointer-events-auto">
                              <button type="button" onClick={() => { setEditingImageType("portada"); setImageEditorUrl(editForm.portada || ""); }} className="px-2 py-1 text-xs bg-teal text-white rounded-pill cursor-pointer hover:bg-teal-dark">✎</button>
                              <button type="button" onClick={() => { setPortadaFile(null); setEditForm({ ...editForm, portada: null }); }} className="px-2 py-1 text-xs bg-red-500 text-white rounded-pill cursor-pointer hover:bg-red-600">✕</button>
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-text-muted text-xs text-center px-2">Subir portada</div>
                        )}
                      </div>
                      <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f, "portada"); }} className="w-full border border-border rounded-row px-2.5 py-1.5 text-xs mt-2" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => handleEditSave(dog.id)} disabled={uploading} className="flex-1 bg-green text-white font-bold py-2 rounded-pill hover:opacity-90 cursor-pointer disabled:opacity-50">
                      {uploading ? "Guardando..." : "Guardar"}
                    </button>
                    <button onClick={() => setEditingId(null)} className="flex-1 border border-border rounded-pill font-bold py-2 hover:bg-surface cursor-pointer">
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {dog.portada || dog.ahora ? (
                    <img src={dog.portada || dog.ahora || ""} alt={dog.name} className="w-20 h-20 rounded-row object-cover flex-shrink-0" />
                  ) : null}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-extrabold text-base text-teal">{dog.name} · {dog.edad}</h3>
                    <p className="text-xs text-text-muted mt-1">{dog.estado} • {dog.sexo} • {dog.tamano}</p>
                    <p className="text-xs text-text-secondary mt-2 line-clamp-1">{dog.historia}</p>
                  </div>

                  <button onClick={() => handleEditStart(dog)} className="font-bold text-sm px-3 py-1.5 border border-border rounded-pill hover:bg-surface cursor-pointer flex-shrink-0">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(dog.id)} disabled={deleting === dog.id} className="font-bold text-sm px-3 py-1.5 border border-red-200 text-red-700 rounded-pill hover:bg-red-50 cursor-pointer flex-shrink-0 disabled:opacity-50">
                    {deleting === dog.id ? "..." : "Borrar"}
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {editingImageType && imageEditorUrl && (
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
